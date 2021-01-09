import { createGetServerSideProps, createSSRClient } from 'src/common/helper';
import { ProfilePage } from 'src/features/profile/ProfilePage';

export default ProfilePage;

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const api = createSSRClient(ctx);
  const username = (ctx.params!.username as string).replace(/^@/, '');

  const [profile, posts] = await Promise.all([
    api.profile_getProfile(username),
    api.post_getPosts(username, 0),
  ]);

  return {
    props: { profile, posts },
  };
});
