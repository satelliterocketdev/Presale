import './index.scss';

import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import App from './App';
import { Web3Provider } from '@ethersproject/providers';
import { APP_VERSION } from './constants/version';

Sentry.init({
  dsn: 'https://00e8720baa134101a7cc94d34e8755a0@o1144835.ingest.sentry.io/6209257',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

Sentry.setTag('version', APP_VERSION);
console.log('version', APP_VERSION);

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK');

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
};

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <App />
    </Web3ProviderNetwork>
  </Web3ReactProvider>,
  document.getElementById('root')
);
