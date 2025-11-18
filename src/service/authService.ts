import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "change_me"; 



// ✅ Register new customer
export const registerService = async (userData: any) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
};


// ✅ Login user and return JWT
export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id,},
    jwtSecret,
    { expiresIn: "1d" }
  );

  return { token, user };
};
