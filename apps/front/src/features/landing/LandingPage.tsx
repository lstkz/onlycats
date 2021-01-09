import React from 'react';
import Link from 'next/Link';
import { Button } from 'src/components/Button';

interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  return (
    <div className="bg-purple-900 text-white px-8 py-20">
      <div className="grid grid-cols-2">
        <img src={require('./vibe-cat.gif')} className="w-full" />
        <div>
          <div className="text-5xl flex items-center text-center">
            View awesome cats!
          </div>
          <div className="flex justify-center">
            <Link href="/register" passHref>
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
