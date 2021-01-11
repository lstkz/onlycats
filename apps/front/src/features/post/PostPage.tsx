import Link from 'next/Link';
import React from 'react';
import { Post, Profile } from 'shared';
import { Dashboard } from 'src/components/Dashboard';
import { ProfileBanner } from 'src/components/ProfileBanner';
import { SubscribeModalModule } from 'src/components/SubscribeModalModule';

interface PostPageProps {
  profile: Profile;
  post: Post;
}

export function PostPage(props: PostPageProps) {
  const { post, profile } = props;
  return (
    <Dashboard>
      <SubscribeModalModule profile={profile}>
        <div className="mt-4 container mx-auto p-4">
          <ProfileBanner profile={profile} />
          <div className="mt-4 border border-gray-200 px-4 py-2 rounded-md">
            <div className="text-xs text-gray-500">
              Posted by{' '}
              <Link href={`/@${profile.username}`}>
                <a>@{profile.username}</a>
              </Link>{' '}
              at {new Date(post.createdAt).toLocaleString()}
            </div>
            {post.text}

            {post.imageUrl && <img className="mt-4" src={post.imageUrl} />}
          </div>
        </div>
      </SubscribeModalModule>
    </Dashboard>
  );
}
