import express from 'express';
import { ChatController } from './chat.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/send', auth(), ChatController.sendMessage);
router.get('/history/:otherUserId', auth(), ChatController.getChatHistory);
router.post('/mark-read', auth(), ChatController.markAsRead);

export const ChatRoutes = router;
