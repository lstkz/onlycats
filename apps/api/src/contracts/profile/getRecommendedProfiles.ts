import { ObjectId } from 'mongodb';
import { S } from 'schema';
import { Profile } from 'shared';
import { PostCollection } from '../../collections/Post';
import { UserCollection } from '../../collections/User';
import { createContract, createRpcBinding } from '../../lib';

export const getRecommendedProfiles = createContract(
  'profile.getRecommendedProfiles'
)
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<Profile[]>()
  .fn(async user => {
    const ret = await PostCollection.aggregate<{ _id: ObjectId }>([
      { $match: { userId: { $ne: user._id } } },
      { $group: { _id: '$userId' } },
      { $limit: 10 },
    ]);
    const users = await UserCollection.findAll({
      _id: {
        $in: ret.map(x => x._id),
      },
    });
    return users.map(item => {
      return {
        id: item._id.toHexString(),
        username: item.username,
        isMe: false,
        isSubscribed: false,
      };
    });
  });

export const getRecommendedProfilesRpc = createRpcBinding({
  injectUser: true,
  signature: 'profile.getRecommendedProfiles',
  handler: getRecommendedProfiles,
});
