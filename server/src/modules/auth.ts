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

