import CatchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ChatService } from './chat.service';

const createChatIntoDB = CatchAsync(async (req, res) => {
  const result = await ChatService.createChat(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Chat created successfully',
    data: result,
  });
});

export const ChatController = {
  createChatIntoDB,
};
