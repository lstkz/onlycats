import { TokenCollection } from '../src/collections/Token';
import { UserCollection } from '../src/collections/User';
import { getId } from './helper';

export async function seedUsers() {
  await UserCollection.insertMany([
    {
      _id: getId(1),
      password: '',
      salt: '',
      username: 'user1',
      username_lowered: 'user1',
    },
    {
      _id: getId(2),
      password: '',
      salt: '',
      username: 'user2',
      username_lowered: 'user2',
    },
  ]);
  await TokenCollection.insertMany([
    {
      _id: 'user1_token',
      userId: getId(1),
    },
    {
      _id: 'user2_token',
      userId: getId(2),
    },
  ]);
}
