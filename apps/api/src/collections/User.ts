import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface UserModel {
  _id: ObjectID;
  username: string;
  username_lowered: string;
  salt: string;
  password: string;
}

export const UserCollection = createCollection<UserModel>('user', [
  {
    key: {
      username_lowered: 1,
    },
  },
]);
