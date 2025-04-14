import { Types } from 'mongoose';

export interface IChatMessage {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  message: string;
  read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
