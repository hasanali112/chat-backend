import { Schema, model } from 'mongoose';
import { IChatMessage } from './chat.interface';

const chatMessageSchema = new Schema<IChatMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ChatMessage = model<IChatMessage>(
  'ChatMessage',
  chatMessageSchema,
);
