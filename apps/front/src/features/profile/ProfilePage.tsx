import React from 'react';
import { PaginatedResult, Post, Profile } from 'shared';
import { Dashboard } from 'src/components/Dashboard';
import { PostFeed } from 'src/components/PostFeed';
import { ProfileBanner } from 'src/components/ProfileBanner';
import { SubscribeModalModule } from 'src/components/SubscribeModalModule';
import { api } from 'src/services/api';

interface ProfilePageProps {
  profile: Profile;
  posts: PaginatedResult<Post>;
}

export function ProfilePage(props: ProfilePageProps) {
  const { profile } = props;
  const [posts, setPosts] = React.useState(props.posts);
  return (
    <Dashboard>
      <SubscribeModalModule
        profile={profile}
        onSubscribed={async () => {
          const latest = await api.post_getPosts(profile.username, 0);
          setPosts(latest);
        }}
      >
        <div className="mt-4 container mx-auto p-4">
          <ProfileBanner profile={profile} />
          Total posts {posts.total}
          {posts.items.map(item => (
            <PostFeed key={item.id} post={item} />
          ))}
        </div>
      </SubscribeModalModule>
    </Dashboard>
  );
}
