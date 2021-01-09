import { createGetServerSideProps, createSSRClient } from 'src/common/helper';
import { PostPage } from 'src/features/post/PostPage';

export default PostPage;

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const api = createSSRClient(ctx);
  const { id } = ctx.params!;
  const username = (ctx.params!.username as string).replace(/^@/, '');

  const [post, profile] = await Promise.all([
    api.post_getPost(id),
    api.profile_getProfile(username),
  ]);

  return {
    props: { post, profile },
  };
});
