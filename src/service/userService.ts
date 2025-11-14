import User, { IUser } from "../models/user.model";

export const createUser = async (data: Partial<IUser>) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");
  const user = await User.create(data);
  return user;
};
// find user by email 
export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
