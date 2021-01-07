import React from 'react';
import _NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createSSRClient } from 'src/common/helper';
import '../styles/global.css';

config.autoAddCss = false;

interface GlobalProps {}

function App({ Component, pageProps }: AppProps & GlobalProps) {
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
      <Component {...pageProps} />
      <div id="portals" />
    </>
  );
}

App.getInitialProps = async ({ ctx }: AppContext) => {
  /* const api = */ createSSRClient(ctx);

  return {};
};

export default App;
