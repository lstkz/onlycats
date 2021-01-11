import { TokenCollection } from '../../collections/Token';
import { UserModel } from '../../collections/User';
import { randomUniqString } from '../../common/helper';
import { getTotalEarnings } from './getTotalEarnings';

export async function getAuthData(user: UserModel) {
  const token = await randomUniqString();
  await TokenCollection.insertOne({
    _id: token,
    userId: user._id,
  });
  return {
    token,
    user: {
      id: user._id.toHexString(),
      username: user.username,
      total: await getTotalEarnings(user._id),
    },
  };
}
