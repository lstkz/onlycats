import { S } from 'schema';
import * as R from 'remeda';
import { PostCollection } from '../../collections/Post';
import { UserCollection } from '../../collections/User';
import { UserSubscriptionCollection } from '../../collections/UserSubscription';
import { createContract, createRpcBinding } from '../../lib';
import { mapPost } from '../../common/mapper';
import { PaginatedResult, Post } from 'shared';

export const getHomeFeed = createContract('post.getHomeFeed')
  .params('user', 'skip')
  .schema({
    user: S.object().appUser(),
    skip: S.number().min(0),
  })
  .returns<PaginatedResult<Post>>()
  .fn(async (user, skip) => {
    const subs = await UserSubscriptionCollection.findAll({
      userId: user._id,
    });
    const targetUsersId = subs.map(x => x.targetUserId);
    const targetUsers = await UserCollection.findAll({
      _id: { $in: targetUsersId },
    });
    const userMap = R.indexBy(targetUsers, x => x._id);
    const filter = {
      userId: { $in: targetUsersId },
    };
    const [items, total] = await Promise.all([
      (await PostCollection.find(filter))
        .skip(skip)
        .limit(10)
        .sort({
          createdAt: -1,
        })
        .toArray(),
      PostCollection.countDocuments(filter),
    ]);
    return {
      total,
      items: items.map(item =>
        mapPost(item, userMap[item.userId.toHexString()], true)
      ),
    };
  });

export const getHomeFeedRpc = createRpcBinding({
  injectUser: true,
  signature: 'post.getHomeFeed',
  handler: getHomeFeed,
});
