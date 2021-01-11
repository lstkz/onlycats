import { S } from 'schema';
import { PaginatedResult, Post } from 'shared';
import { PostCollection } from '../../collections/Post';
import { UserCollection } from '../../collections/User';
import { UserSubscriptionCollection } from '../../collections/UserSubscription';
import { AppError } from '../../common/errors';
import { mapPost } from '../../common/mapper';
import { createContract, createRpcBinding } from '../../lib';

export const getPosts = createContract('post.getPosts')
  .params('user', 'username', 'skip')
  .schema({
    user: S.object().appUser(),
    username: S.string(),
    skip: S.number().min(0),
  })
  .returns<PaginatedResult<Post>>()
  .fn(async (user, username, skip) => {
    const targetUser = await UserCollection.findOne({
      username_lowered: username.toLowerCase(),
    });
    if (!targetUser) {
      throw new AppError('Profile not found');
    }
    const [items, total, sub] = await Promise.all([
      (
        await PostCollection.find({
          userId: targetUser._id,
        })
      )
        .skip(skip)
        .limit(10)
        .sort({
          createdAt: -1,
        })
        .toArray(),
      PostCollection.countDocuments({
        userId: targetUser._id,
      }),
      UserSubscriptionCollection.findOne({
        targetUserId: targetUser._id,
        userId: user._id,
      }),
    ]);

    return {
      total,
      items: items.map(item => mapPost(item, targetUser, !!sub)),
    };
  });

export const getPostsRpc = createRpcBinding({
  injectUser: true,
  signature: 'post.getPosts',
  handler: getPosts,
});
