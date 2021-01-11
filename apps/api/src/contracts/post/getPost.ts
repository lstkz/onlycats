import { S } from 'schema';
import { Post } from 'shared';
import { PostCollection } from '../../collections/Post';
import { UserCollection } from '../../collections/User';
import { UserSubscriptionCollection } from '../../collections/UserSubscription';
import { AppError } from '../../common/errors';
import { mapPost } from '../../common/mapper';
import { createContract, createRpcBinding } from '../../lib';

export const getPost = createContract('post.getPost')
  .params('user', 'id')
  .schema({
    user: S.object().appUser(),
    id: S.string().objectId(),
  })
  .returns<Post>()
  .fn(async (user, id) => {
    const post = await PostCollection.findById(id);
    if (!post) {
      throw new AppError('Post not found');
    }
    const sub = await UserSubscriptionCollection.findOne({
      targetUserId: post.userId,
      userId: user._id,
    });

    const targetUser = await UserCollection.findByIdOrThrow(post.userId);

    return mapPost(post, targetUser, !!sub);
  });

export const getPostRpc = createRpcBinding({
  injectUser: true,
  signature: 'post.getPost',
  handler: getPost,
});
