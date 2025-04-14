/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ChatService } from './chat.service';

export const ChatController = {
  sendMessage: async (req: Request, res: Response) => {
    try {
      const { receiverId, message } = req.body;
      const senderId = req.user?.id;

      const result = await ChatService.sendMessage(
        senderId,
        receiverId,
        message,
      );

      res.status(200).json({
        success: true,
        message: 'Message sent',
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to send message',
      });
    }
  },

  getChatHistory: async (req: Request, res: Response) => {
    try {
      const { otherUserId } = req.params;
      const currentUserId = req.user?.id;

      const messages = await ChatService.getChatHistory(
        currentUserId,
        otherUserId,
      );

      res.status(200).json({
        success: true,
        data: messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch chat history',
      });
    }
  },

  markAsRead: async (req: Request, res: Response) => {
    try {
      const { messageIds } = req.body;
      await ChatService.markAsRead(messageIds);

      res.status(200).json({
        success: true,
        message: 'Messages marked as read',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update messages',
      });
    }
  },
};
