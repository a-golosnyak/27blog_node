import { User } from "./User";

export type UserType = Pick<User, '_id' | 'email' | 'firstName' | 'lastName' | 'age' | 'createdAt' | 'updatedAt' | 'role'>;
