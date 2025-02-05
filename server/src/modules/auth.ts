import jwt from "jsonwebtoken";
 
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};


import { User } from "@prisma/client";
 
export type AuthenticatedUser = Pick<User, 'id' | 'username'>
 
export const getUser = (token: string): AuthenticatedUser | null => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as AuthenticatedUser
    return payload;
  } catch {
    return null
  }
}


import * as bcrypt from "bcrypt";
 
 export const comparePasswords = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
 
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};

