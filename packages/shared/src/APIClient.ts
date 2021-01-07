/// <reference types="typescript/lib/lib.dom" />

// IMPORTS
import { Foo } from './types';
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
