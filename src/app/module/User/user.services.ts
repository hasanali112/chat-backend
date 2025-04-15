import { User } from './user.model';

const getAllUsers = async () => {
  return await User.find({});
};

export const UserService = {
  getAllUsers,
};
