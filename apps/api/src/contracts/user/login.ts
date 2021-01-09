import { S } from 'schema';
import { AuthData } from 'shared';
import { UserCollection } from '../../collections/User';
import { AppError } from '../../common/errors';
import { createPasswordHash } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';
import { getAuthData } from './getAuthData';

export const login = createContract('user.login')
  .params('values')
  .schema({
    values: S.object().keys({
      username: S.string(),
      password: S.string(),
    }),
  })
  .returns<AuthData>()
  .fn(async values => {
    const user = await UserCollection.findOne({
      username_lowered: values.username.toLowerCase(),
    });
    if (!user) {
      throw new AppError('user not found');
    }
    const passwordHash = await createPasswordHash(values.password, user.salt);
    if (user.password !== passwordHash) {
      throw new AppError('Invalid password');
    }
    return getAuthData(user);
  });

export const loginRpc = createRpcBinding({
  public: true,
  signature: 'user.login',
  handler: login,
});
