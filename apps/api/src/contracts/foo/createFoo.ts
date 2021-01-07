import { S } from 'schema';
import { FooCollection } from '../../collections/Foo';
import { createContract, createRpcBinding } from '../../lib';
import { Foo } from 'shared';

export const createFoo = createContract('foo.createFoo')
  .params('values')
  .schema({
    values: S.object().keys({
      name: S.string(),
    }),
  })
  .returns<Foo>()
  .fn(async values => {
    const ret = await FooCollection.insertOne({
      name: values.name,
    });
    return {
      id: ret.insertedId.toHexString(),
      name: values.name,
    };
  });

export const createFooRpc = createRpcBinding({
  public: true,
  signature: 'foo.createFoo',
  handler: createFoo,
});
