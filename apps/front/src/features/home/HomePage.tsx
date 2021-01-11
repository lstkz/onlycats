import Link from 'next/Link';
import React from 'react';
import { PaginatedResult, Post, Profile } from 'shared';
import { Dashboard } from 'src/components/Dashboard';
import { PostFeed } from 'src/components/PostFeed';

interface HomePageProps {
  recommended: Profile[];
  posts: PaginatedResult<Post>;
}

export function HomePage(props: HomePageProps) {
  const { recommended, posts } = props;
  return (
    <Dashboard>
      <div className="grid grid-cols-10 mt-4 gap-4 px-4">
        <div className="col-span-6">
          {posts.items.map(item => (
            <PostFeed key={item.id} post={item} />
          ))}
        </div>
        <div className="col-span-4">
          <div className="font-bold text-sm uppercase mb-1">Recommended</div>
          {recommended.map(item => (
            <Link href={`/@${item.username}`} key={item.id}>
              <a className="block mb-1">@{item.username}</a>
            </Link>
          ))}
        </div>
      </div>
    </Dashboard>
  );
}
