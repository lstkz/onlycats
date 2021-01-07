import { createFoo } from '../src/contracts/foo/createFoo';
import { getAllFoos } from '../src/contracts/foo/getAllFoos';
import { execContract, setupDb } from './helper';

setupDb();

it('should create foo', async () => {
  await execContract(createFoo, {
    values: {
      name: 'test',
    },
  });
  const ret = await execContract(getAllFoos, {});
  expect(ret).toHaveLength(1);
  expect(ret[0].name).toEqual('test');
});
