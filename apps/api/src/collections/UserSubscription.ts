import { ObjectId } from 'mongodb';
import { createCollection } from '../db';

export interface UserSubscriptionModel {
  _id: string;
  userId: ObjectId;
  targetUserId: ObjectId;
}

export const UserSubscriptionCollection = createCollection<UserSubscriptionModel>(
  'userSubscription',
  [
    {
      key: {
        userId: 1,
      },
    },
    {
      key: {
        targetUserId: 1,
      },
    },
  ]
);
