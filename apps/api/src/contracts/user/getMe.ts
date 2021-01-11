import { S } from 'schema';
import { User } from 'shared';
import { createContract, createRpcBinding } from '../../lib';
import { getTotalEarnings } from './getTotalEarnings';

export const getMe = createContract('user.getMe')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<User>()
  .fn(async user => {
    return {
      id: user._id.toHexString(),
      username: user.username,
      total: await getTotalEarnings(user._id),
    };
  });

export const getMeRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.getMe',
  handler: getMe,
});
