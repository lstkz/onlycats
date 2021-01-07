import { createCollection } from '../db';

export interface FooModel {
  name: string;
}

export const FooCollection = createCollection<FooModel>('foo');
