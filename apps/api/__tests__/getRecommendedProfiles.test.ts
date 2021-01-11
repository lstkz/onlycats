import { PostCollection } from '../src/collections/Post';
import { getRecommendedProfiles } from '../src/contracts/profile/getRecommendedProfiles';
import { execContract, getId, setupDb } from './helper';
import { seedUsers } from './seedData';

setupDb();

beforeEach(async () => {
  await seedUsers();
});

it('should return recommended profiles', async () => {
  await PostCollection.insertMany([
    {
      createdAt: new Date(0),
      imageUrl: 'img1',
      text: 'text 1',
      userId: getId(1),
    },
    {
      createdAt: new Date(0),
      imageUrl: 'img2',
      text: 'text 2',
      userId: getId(1),
    },
    {
      createdAt: new Date(0),
      imageUrl: 'img2',
      text: 'text 3',
      userId: getId(2),
    },
  ]);
  const ret = await execContract(getRecommendedProfiles, {}, 'user1_token');
  expect(ret).toHaveLength(1);
  expect(ret[0].username).toEqual('user2');
});
