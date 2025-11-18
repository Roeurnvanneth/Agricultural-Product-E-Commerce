import { IUser } from "../models/user.model";

export const sanitizeUser = (user: IUser) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    status: user.status,
  };
};
