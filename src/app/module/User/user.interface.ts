import { Model } from 'mongoose';

export type TUser = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  profileImg?: string;
  isDeleted: boolean;
  passwordChangedAt?: Date;
};

export interface UserModel extends Model<TUser> {
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
