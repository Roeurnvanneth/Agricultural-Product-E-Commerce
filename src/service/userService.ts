import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  roles: string;
  status?: string;
}

// GET ALL FARMERS
export const getAllFarmers = async (): Promise<IUser[]> => {
  return await User.find({ roles: "farmer" }).select("-password");
};

// GET FARMER BY ID
export const getFarmerById = async (id: string): Promise<IUser | null> => {
  return await User.findOne({ _id: id, roles: "farmer" }).select("-password");
};

// UPDATE FARMER
export const updateFarmer = async (
  id: string, 
  data: Partial<IUser>
): Promise<IUser | null> => {
  // Create a copy of data to avoid modifying the original
  const updateData = { ...data };

  // Hash password if provided
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return await User.findOneAndUpdate(
    { _id: id, roles: "farmer" },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
};

// DELETE FARMER
export const deleteFarmer = async (id: string): Promise<IUser | null> => {
  return await User.findOneAndDelete({ _id: id, roles: "farmer" });
};

// CREATE USER
export const createUser = async (data: CreateUserDTO): Promise<IUser> => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await User.create({
    ...data,
    password: hashedPassword,
    status: data.status || "active",
  });

  // Convert to object and remove password before returning
  const userObject = user.toObject();  
  return userObject;
};

// FIND USER BY EMAIL
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

// VERIFY PASSWORD
export const verifyPassword = async (
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// GET ALL USERS (optional - for admin purposes)
export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find().select("-password");
};

// GET USER BY ID
export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).select("-password");
};

// UPDATE USER
export const updateUser = async (
  id: string, 
  data: Partial<IUser>
): Promise<IUser | null> => {
  const updateData = { ...data };

  // Hash password if provided
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");
};

// DELETE USER
export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

// CHANGE USER STATUS
export const changeUserStatus = async (
  id: string, 
  status: "active" | "inactive" | "suspended"
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    id, 
    { status }, 
    { new: true }
  ).select("-password");
};

// COUNT FARMERS
export const countFarmers = async (): Promise<number> => {
  return await User.countDocuments({ roles: "farmer" });
};

// SEARCH FARMERS
export const searchFarmers = async (searchTerm: string): Promise<IUser[]> => {
  return await User.find({
    roles: "farmer",
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { email: { $regex: searchTerm, $options: "i" } },
      { phone: { $regex: searchTerm, $options: "i" } },
    ],
  }).select("-password");
};