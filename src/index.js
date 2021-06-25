import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { IntlProvider } from 'react-intl';
import messagesEn from './compiled-lang/en.json';
import { Provider as ReduxProvider } from 'react-redux';
import { TokenizedApi } from '@tokenized/sdk-js-private';
import { TokenizedApiProvider } from '@tokenized/sdk-react-private';
import store from './store';
import App from './App';

// This is for internal Tokenized development use
const backendOverride = window.localStorage.getItem(
  'tokenized-sdk-example-backend',
);

const locale =
  window.navigator.languages?.[0] || window.navigator.language || 'en';

const tokenizedApi = new TokenizedApi({
  // By default, the SDK connects to the Tokenized platform, allowing login
  // with the same credentials used in the Tokenized first-party app. If you’ve
  // been assigned a separate third-party platform, you can use it by passing
  // in your public API key like this:
  //
  // platformApiKey:
  //   'public.dbd1f1c781c2018f818b8d2cc898f32c776c1f7541916875ca10a4eea2c6e73e',
  //
  // ...or alternatively pass in a map from tokenizedBackend environments to
  // all your API keys, and the SDK will select the right one:
  //
  // platformApiKey: {
  //   test:
  //     'public.c9a4c8883fbce04d17a0041b1ee9436355dd2fd45fea39fec6e4f4c811238e82',
  //   production:
  //     'public.899a0f0715422da945f272d97b52afa1a0548315940b547be9de2e4a27e1a381',
  // },

  // For customer development work on third-party, Tokenized-powered apps,
  // we recommend working with the `test` back end, which is separated
  // from production users, but more stable than the `development` back end.
  tokenizedBackend: backendOverride || 'test',
  applicationIdentifier: 'tokenized-example-react',
});

ReactDOM.render(
  <TokenizedApiProvider tokenizedApi={tokenizedApi}>
    <IntlProvider locale={locale} messages={messagesEn}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </IntlProvider>
  </TokenizedApiProvider>,
  document.getElementById('root'),
);
