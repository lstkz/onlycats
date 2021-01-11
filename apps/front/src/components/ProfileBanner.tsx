import Link from 'next/Link';
import React from 'react';
import { Profile } from 'shared';
import { Button } from './Button';
import { useSubscribeModalActions } from './SubscribeModalModule';

interface ProfileBannerProps {
  profile: Profile;
}

export function ProfileBanner(props: ProfileBannerProps) {
  const { profile } = props;
  const { showSubscribe } = useSubscribeModalActions();
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
          {profile.isSubscribed ? (
            <div className="bg-green-600 px-2 py-1 text-xs rounded-lg text-white">
              Subscribed
            </div>
          ) : (
            <Button onClick={showSubscribe}>Subscribe $5.00</Button>
          )}
        </div>
      )}
    </div>
  );
}
