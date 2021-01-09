import { ObjectID } from 'mongodb';
import { createCollection } from '../db';

export interface PostModel {
  _id: ObjectID;
  userId: ObjectID;
  text: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

export const PostCollection = createCollection<PostModel>('post');
