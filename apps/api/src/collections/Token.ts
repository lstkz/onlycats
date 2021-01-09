import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface TokenModel {
  _id: string;
  userId: ObjectID;
}

export const TokenCollection = createCollection<TokenModel>('token');
