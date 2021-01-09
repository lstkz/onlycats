import React from 'react';
import { PaginatedResult, Post, Profile } from 'shared';
import { Dashboard } from 'src/components/Dashboard';
import { PostFeed } from 'src/components/PostFeed';
import { ProfileBanner } from 'src/components/ProfileBanner';

interface ProfilePageProps {
  profile: Profile;
  posts: PaginatedResult<Post>;
}

export function ProfilePage(props: ProfilePageProps) {
  const { profile, posts } = props;
  return (
    <Dashboard>
      <div className="mt-4 container mx-auto p-4">
        <ProfileBanner profile={profile} />
        Total posts {posts.total}
        {posts.items.map(item => (
          <PostFeed key={item.id} post={item} />
        ))}
      </div>
    </Dashboard>
  );
}
