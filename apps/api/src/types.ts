import { Request, Response, NextFunction } from 'express';
import { UserModel } from './collections/User';

export type Handler = (req: Request, res: Response, next: NextFunction) => void;

export interface AppUser extends UserModel {}

declare module 'express' {
  interface Request {
    user: AppUser;
  }
}
