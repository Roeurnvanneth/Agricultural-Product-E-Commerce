// src/models/user.model.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  roles: string;
  status: "active" | "inactive" | "suspended";  // optional: if you want, default can be 'active'

  comparePassword: (candidatePassword: string) => Promise<boolean>;
}


// role.model.ts
export interface IRole extends Document {
  name: string; // 'customer' | 'farmer' | 'admin'
}

// userRole.model.ts
export interface IUserRole extends Document {
  user: IUser["_id"];
  role: IRole["_id"];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String,required: true, unique: true,sparse:true },
    address: { type: String },
    roles: { type: String, required: true }, // dynamic
    status: { type: String, default: "active" },


  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
