import { Post } from 'shared';
import { PostModel } from '../collections/Post';
import { UserModel } from '../collections/User';

export function mapPost(post: PostModel, targetUser: UserModel): Post {
  return {
    id: post._id.toHexString(),
    username: targetUser.username,
    imageUrl: post.imageUrl,
    isRestricted: false,
    text: post.text,
    createdAt: post.createdAt.toISOString(),
  };
}
