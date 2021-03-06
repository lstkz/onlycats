import { S } from 'schema';
import { Profile } from 'shared';
import { UserCollection } from '../../collections/User';
import { UserSubscriptionCollection } from '../../collections/UserSubscription';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const getProfile = createContract('profile.getProfile')
  .params('user', 'username')
  .schema({
    user: S.object().appUser(),
    username: S.string(),
  })
  .returns<Profile>()
  .fn(async (user, username) => {
    const targetUser = await UserCollection.findOne({
      username_lowered: username.toLowerCase(),
    });
    if (!targetUser) {
      throw new AppError('Profile not found');
    }
    const sub = await UserSubscriptionCollection.findOne({
      targetUserId: targetUser._id,
      userId: user._id,
    });
    return {
      id: targetUser._id.toHexString(),
      username: targetUser.username,
      isMe: user._id.equals(targetUser._id),
      isSubscribed: !!sub,
    };
  });

export const getProfileRpc = createRpcBinding({
  injectUser: true,
  signature: 'profile.getProfile',
  handler: getProfile,
});
