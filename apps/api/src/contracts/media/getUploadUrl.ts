import { S } from 'schema';
import { randomString } from '../../common/helper';
import { config } from '../../config';
import { createContract, createRpcBinding, s3 } from '../../lib';

export const getUploadUrl = createContract('media.getUploadUrl')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<{
    url: string;
    fields: Record<string, string>;
  }>()
  .fn(async user => {
    const name = randomString(10);
    return s3.createPresignedPost({
      Bucket: config.bucket,
      Fields: {
        key: `photo/${user._id}/${name}`,
        'Content-Type': 'image/png',
      },
      Conditions: [{ acl: 'public-read' }],
    });
  });

export const getUploadUrlRpc = createRpcBinding({
  injectUser: true,
  signature: 'media.getUploadUrl',
  handler: getUploadUrl,
});
