import React from 'react';
import _NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createSSRClient } from 'src/common/helper';
import '../styles/global.css';
import { User } from 'shared';
import { AuthModule } from 'src/components/AuthModule';

config.autoAddCss = false;

interface GlobalProps {
  user: User | null;
}

function App({ Component, pageProps, user }: AppProps & GlobalProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <link
          href="https://use.fontawesome.com/releases/v5.12.1/css/svg-with-js.css"
          rel="stylesheet"
        ></link>

        <title>Onlycats</title>
      </Head>
      <AuthModule initialUser={user}>
        <Component {...pageProps} />
        <div id="portals" />
      </AuthModule>
    </>
  );
}

App.getInitialProps = async ({ ctx }: AppContext) => {
  const api = createSSRClient(ctx);

  let user: User | null = null;
  if (api.getToken()) {
    user = await api.user_getMe();
  }

  return {
    user,
  };
};

export default App;
