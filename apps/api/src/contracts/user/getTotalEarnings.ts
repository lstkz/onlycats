import { ObjectId } from 'mongodb';
import { UserSubscriptionCollection } from '../../collections/UserSubscription';

export async function getTotalEarnings(userId: ObjectId) {
  const total = await UserSubscriptionCollection.countDocuments({
    targetUserId: userId,
  });

  return total * 5;
}
