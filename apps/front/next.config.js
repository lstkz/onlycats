const withImages = require('next-images');

const withTM = require('next-transpile-modules')(['shared', 'schema']);

function getEnv() {
  const ret = {};
  Object.keys(process.env).forEach(name => {
    if (name.startsWith('FS_PUBLIC_')) {
      ret[name.replace('FS_PUBLIC_', '')] = process.env[name];
    }
  });
  return ret;
}

module.exports = withTM(
  withImages({
    // Use the CDN in production and localhost for development.
    assetPrefix: process.env.CDN_DOMAIN,
    typescript: {
      ignoreBuildErrors: true,
    },
    env: getEnv(),
  })
);
