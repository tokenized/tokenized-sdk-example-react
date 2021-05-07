import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import App from './App';
import { TokenizedApi, TokenizedApiProvider } from '@tokenized/sdk-js-private';

const tokenizedApi = new TokenizedApi({
  tokenizedBackend: 'development',
  applicationIdentifier: 'tokenized-example-react',
});

ReactDOM.render(
  <TokenizedApiProvider tokenizedApi={tokenizedApi}>
    <App />
  </TokenizedApiProvider>,
  document.getElementById('root'),
);
