import { ObjectId } from 'mongodb';
import { S } from 'schema';
import { PostCollection, PostModel } from '../../collections/Post';
import { createContract, createRpcBinding } from '../../lib';

export const createPost = createContract('post.createPost')
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({
      text: S.string().nullable(),
      imageUrl: S.string().nullable(),
    }),
  })
  .returns<{
    id: string;
  }>()
  .fn(async (user, values) => {
    const post: PostModel = {
      _id: new ObjectId(),
      createdAt: new Date(),
      ...values,
      userId: user._id,
    };
    await PostCollection.insertOne(post);
    return {
      id: post._id.toHexString(),
    };
  });

export const createPostRpc = createRpcBinding({
  injectUser: true,
  signature: 'post.createPost',
  handler: createPost,
});
