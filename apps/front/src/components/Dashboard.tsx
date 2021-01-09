import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/Link';
import React from 'react';
import { useAuthActions, useUser } from './AuthModule';
import { Button } from './Button';

interface DashboardProps {
  children: React.ReactNode;
}

export function Dashboard(props: DashboardProps) {
  const { children } = props;
  const user = useUser()!;
  const { logout } = useAuthActions();
  return (
    <div>
      <div className="flex bg-green-500 px-2 py-4 text-white justify-between items-center">
        <h1 className="font-bold  text-lg">OnlyCats</h1>
        <div className="flex items-center">
          <Link href="/create-post">
            <a className="text-white w-5 h-5 flex items-center justify-center text-xs bg-yellow-500 mr-4 hover:bg-yellow-600 cursor-pointer">
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </Link>

          <span className="mr-2">Hello, @{user.username}</span>
          <Button onClick={logout}>logout</Button>
        </div>
      </div>
      {children}
    </div>
  );
}
