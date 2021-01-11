import Link from 'next/Link';
import React from 'react';
import { Post } from 'shared';

interface PostFeedProps {
  post: Post;
}

export function PostFeed(props: PostFeedProps) {
  const { post } = props;
  return (
    <div className="mt-4 border border-gray-200 px-4 py-2 rounded-md">
      <div className="text-xs text-gray-500">
        Posted by{' '}
        <Link href={`/@${post.username}`}>
          <a>@{post.username}</a>
        </Link>{' '}
        at {new Date(post.createdAt).toLocaleString()}
      </div>
      {post.text}

      {post.isRestricted ? (
        <div className="w-full bg-gray-200 rounded-xl h-20 flex items-center justify-center">
          Subscribe to see this post
        </div>
      ) : (
        post.imageUrl && <img className="mt-4" src={post.imageUrl} />
      )}
    </div>
  );
}
