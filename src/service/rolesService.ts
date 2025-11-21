import Role from "../models/role.model";

// Create a role
export const createRole = async (name: string) => {
  const exist = await Role.findOne({ name });
  if (exist) throw new Error("Role already exists");

  const role = await Role.create({ name });
  return role;
};

