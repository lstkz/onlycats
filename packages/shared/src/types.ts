export interface Foo {
  id: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface Profile {
  id: string;
  username: string;
  isSubscribed: boolean;
  isMe: boolean;
}

export interface Post {
  id: string;
  username: string;
  text: string | null;
  imageUrl: string | null;
  isRestricted: boolean;
  createdAt: string;
}

export interface PaginatedResult<T> {
  total: number;
  items: T[];
}
