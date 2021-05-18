import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import { TokenizedApi } from '@tokenized/sdk-js-private';
import { TokenizedApiProvider } from '@tokenized/sdk-react-private';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query/react';

const tokenizedApi = new TokenizedApi({
  tokenizedBackend: 'development',
  applicationIdentifier: 'tokenized-example-react',
});

ReactDOM.render(
  <TokenizedApiProvider tokenizedApi={tokenizedApi}>
    <QueryClientProvider client={tokenizedApi.getQueryClient()}>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <App />
  </TokenizedApiProvider>,
  document.getElementById('root'),
);
