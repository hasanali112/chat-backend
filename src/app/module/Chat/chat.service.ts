import { io } from '../../../app';
import { activeUsers } from '../../../socketServer';
import { ChatMessage } from './chat.model';

const sendMessage = async (
  senderId: string,
  receiverId: string,
  message: string,
) => {
  // Save to database
  const savedMessage = await ChatMessage.create({
    sender: senderId,
    receiver: receiverId,
    message,
  });

  // Emit to Socket.IO
  const receiverSocketId = activeUsers.get(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('private-message', savedMessage);
  }

  return savedMessage;
};

const getChatHistory = async (userId1: string, userId2: string) => {
  return await ChatMessage.find({
    $or: [
      { sender: userId1, receiver: userId2 },
      { sender: userId2, receiver: userId1 },
    ],
  })
    .sort({ createdAt: 1 })
    .populate('sender receiver', 'name email');
};

// Mark messages as read
const markAsRead = async (messageIds: string[]) => {
  return await ChatMessage.updateMany(
    { _id: { $in: messageIds } },
    { $set: { read: true } },
  );
};

export const ChatService = {
  sendMessage,
  getChatHistory,
  markAsRead,
};
