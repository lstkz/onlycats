import Link from 'next/Link';
import React from 'react';
import { Profile } from 'shared';
import { Button } from './Button';

interface ProfileBannerProps {
  profile: Profile;
}

export function ProfileBanner(props: ProfileBannerProps) {
  const { profile } = props;
  return (
    <div className=" flex items-center ">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div className="ml-2 text-lg mr-4">
        <Link href={`/@${profile.username}`}>
          <a>@{profile.username}</a>
        </Link>
      </div>
      {!profile.isMe && (
        <div className="ml-auto">
          <Button>Subscribe $5.00</Button>
        </div>
      )}
    </div>
  );
}
