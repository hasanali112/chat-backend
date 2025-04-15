import { IChatMessage } from './chat.interface';
import { ChatMessage } from './chat.model';

const createChat = async (payload: IChatMessage) => {
  const chat = await ChatMessage.create(payload);
  return chat;
};

export const ChatService = {
  createChat,
};
