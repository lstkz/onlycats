import { Post } from 'shared';
import { PostModel } from '../collections/Post';
import { UserModel } from '../collections/User';

export function mapPost(
  post: PostModel,
  targetUser: UserModel,
  hasSub?: boolean
): Post {
  return {
    id: post._id.toHexString(),
    username: targetUser.username,
    imageUrl: hasSub ? post.imageUrl : null,
    isRestricted: !hasSub,
    text: post.text,
    createdAt: post.createdAt.toISOString(),
  };
}
