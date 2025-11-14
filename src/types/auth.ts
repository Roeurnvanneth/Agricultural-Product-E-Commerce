export interface IAuthor {
  _id?: string;
  name: string;
  email?: string;
  phone?: string;
  dob?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAuthorInput {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  dob?: Date;
}

export interface UpdateAuthorInput {
    id?: string;
  name?: string;
  email?: string;
  phone?: string;
  dob?: Date;
}