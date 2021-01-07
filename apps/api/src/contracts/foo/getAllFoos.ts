import { Foo } from 'shared';
import { FooCollection } from '../../collections/Foo';
import { createContract, createRpcBinding } from '../../lib';

export const getAllFoos = createContract('foo.getAllFoos')
  .params()
  .schema({})
  .returns<Foo[]>()
  .fn(async () => {
    return await FooCollection.findAll({});
  });

export const getAllFoosRpc = createRpcBinding({
  public: true,
  signature: 'foo.getAllFoos',
  handler: getAllFoos,
});
