import React from 'react';

interface AuthPageProps {
  children: React.ReactNode;
  title: React.ReactNode;
  bottom?: React.ReactNode;
  error: string;
}

export function AuthPage(props: AuthPageProps) {
  const { children, title, error, bottom } = props;
  return (
    <div className="container mx-auto mt-20 border border-gray-200 shadow-lg rounded-lg p-4">
      <h1 className="text-lg text-center mb-4">{title}</h1>
      {error && (
        <div className="mb-4 rounded-sm border border-red-600 bg-red-500 text-white px-2 text-center">
          {error}
        </div>
      )}

      {children}
      {bottom && <div className="mt-4 text-xs">{bottom}</div>}
    </div>
  );
}
