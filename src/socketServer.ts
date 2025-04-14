/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server as SocketServer, Socket } from 'socket.io';

type AuthData = { userId: string };
type MessageData = { to: string; message: string };
type WrappedPayload<T> = { type: string; data: T } | T;

interface SocketWithUser extends Socket {
  userId?: string;
}

const activeUsers = new Map<string, string>();

const handleAuthentication = (
  socket: SocketWithUser,
  data: AuthData,
  callback?: (response: any) => void,
) => {
  if (!data?.userId) throw new Error('User ID is required');

  socket.userId = data.userId;
  activeUsers.set(data.userId, socket.id);

  console.log(`✅ User ${data.userId} authenticated`);
  callback?.({ status: 'success' });
  socket.emit('authenticated', { userId: data.userId });
};

const handlePrivateMessage = (
  io: SocketServer,
  socket: SocketWithUser,
  payload: WrappedPayload<MessageData>,
  callback?: (response: any) => void,
) => {
  const data = 'data' in payload ? payload.data : payload;

  if (!socket.userId) throw new Error('Not authenticated');
  if (!data.to) throw new Error('Recipient ID is required');
  if (!data.message) throw new Error('Message content is required');

  const message = {
    from: socket.userId,
    to: data.to,
    content: data.message,
    timestamp: new Date().toISOString(),
  };

  const receiverSocketId = activeUsers.get(data.to);
  const isDelivered = !!receiverSocketId;

  if (isDelivered) {
    io.to(receiverSocketId).emit('private-message', message);
  }

  callback?.({
    status: isDelivered ? 'delivered' : 'sent',
    messageId: Date.now().toString(),
    timestamp: message.timestamp,
    receiverOnline: isDelivered,
  });
};

const socketHandlers = (io: SocketServer) => {
  io.on('connection', (socket: SocketWithUser) => {
    console.log('🔌 New connection:', socket.id);

    socket.on('authenticate', (data: AuthData, callback) =>
      handleAuthentication(socket, data, callback),
    );

    socket.on(
      'private-message',
      (payload: WrappedPayload<MessageData>, callback) =>
        handlePrivateMessage(io, socket, payload, callback),
    );

    socket.on('disconnect', () => {
      if (socket.userId) {
        activeUsers.delete(socket.userId);
        console.log(`🚪 User ${socket.userId} disconnected`);
      }
    });
  });
};

export default socketHandlers;
