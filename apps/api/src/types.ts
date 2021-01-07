import { Request, Response, NextFunction } from 'express';
import { ObjectID } from 'mongodb';

export type Handler = (req: Request, res: Response, next: NextFunction) => void;

export interface AppUser {
  _id: ObjectID;
  email: string;
}

declare module 'express' {
  interface Request {
    user: AppUser;
  }
}
