/// <reference types="typescript/lib/lib.dom" />

// IMPORTS
import { Foo, PaginatedResult, Post, Profile, User, AuthData } from './types';
// IMPORTS END

export class APIClient {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> = null!;

  constructor(
    private baseUrl: string,
    public getToken: () => string | null,
    fetch?: any
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.fetch =
      fetch ?? (typeof window === 'undefined' ? null! : window.fetch);
    if (this.fetch) {
      this.fetch = this.fetch.bind(fetch);
    }
  }

  // SIGNATURES
  foo_createFoo(values: { name: string }): Promise<Foo> {
    return this.call('foo.createFoo', { values });
  }
  foo_getAllFoos(): Promise<Foo[]> {
    return this.call('foo.getAllFoos', {});
  }
  media_getUploadUrl(): Promise<{
    url: string;
    fields: Record<string, string>;
  }> {
    return this.call('media.getUploadUrl', {});
  }
  payment_subscribe(values: {
    paymentMethodId: string;
    username: string;
  }): Promise<{ id: string }> {
    return this.call('payment.subscribe', { values });
  }
  post_createPost(values: {
    text: string | null;
    imageUrl: string | null;
  }): Promise<{ id: string }> {
    return this.call('post.createPost', { values });
  }
  post_getHomeFeed(skip: number): Promise<PaginatedResult<Post>> {
    return this.call('post.getHomeFeed', { skip });
  }
  post_getPost(id: ObjectId): Promise<Post> {
    return this.call('post.getPost', { id });
  }
  post_getPosts(
    username: string,
    skip: number
  ): Promise<PaginatedResult<Post>> {
    return this.call('post.getPosts', { username, skip });
  }
  profile_getProfile(username: string): Promise<Profile> {
    return this.call('profile.getProfile', { username });
  }
  profile_getRecommendedProfiles(): Promise<Profile[]> {
    return this.call('profile.getRecommendedProfiles', {});
  }
  user_getMe(): Promise<User> {
    return this.call('user.getMe', {});
  }
  user_login(values: {
    username: string;
    password: string;
  }): Promise<AuthData> {
    return this.call('user.login', { values });
  }
  user_register(values: {
    username: string;
    password: string;
  }): Promise<AuthData> {
    return this.call('user.register', { values });
  }
  // SIGNATURES END
  private async call(name: string, params: any): Promise<any> {
    const token = this.getToken();
    const headers: any = {
      'content-type': 'application/json',
    };
    if (token) {
      headers['x-token'] = token;
    }

    const res = await this.fetch(`${this.baseUrl}/rpc/${name}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });
    const body = await res.json();
    if (res.status !== 200) {
      const err: any = new Error(body.error || 'Failed to call API');
      err.res = res;
      err.body = body;
      throw err;
    }
    return body;
  }
}
