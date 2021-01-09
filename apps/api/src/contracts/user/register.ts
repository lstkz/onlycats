import { ObjectID } from 'mongodb';
import { S } from 'schema';
import { AuthData } from 'shared';
import { UserCollection, UserModel } from '../../collections/User';
import { AppError } from '../../common/errors';
import { createPasswordHash, randomSalt } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';
import { getAuthData } from './getAuthData';

export const register = createContract('user.register')
  .params('values')
  .schema({
    values: S.object().keys({
      username: S.string(),
      password: S.string().min(3),
    }),
  })
  .returns<AuthData>()
  .fn(async values => {
    const existing = await UserCollection.findOne({
      username_lowered: values.username.toLowerCase(),
    });
    if (existing) {
      throw new AppError('Duplicated username');
    }
    const salt = await randomSalt();
    const passwordHash = await createPasswordHash(values.password, salt);
    const user: UserModel = {
      _id: new ObjectID(),
      password: passwordHash,
      salt,
      username: values.username,
      username_lowered: values.username.toLowerCase(),
    };
    await UserCollection.insertOne(user);
    return getAuthData(user);
  });

export const registerRpc = createRpcBinding({
  public: true,
  signature: 'user.register',
  handler: register,
});
