import { createGetServerSideProps, createSSRClient } from 'src/common/helper';
import { HomePage } from 'src/features/home/HomePage';

export default HomePage;

export const getServerSideProps = createGetServerSideProps(async ctx => {
  const api = createSSRClient(ctx);
  const [posts, recommended] = await Promise.all([
    api.post_getHomeFeed(0),
    api.profile_getRecommendedProfiles(),
  ]);
  return {
    props: { recommended, posts },
  };
});
