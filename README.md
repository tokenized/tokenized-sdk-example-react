# Tokenized JavaScript SDK example app

[Tokenized](https://tokenized.com) is a platform for issuing, managing and
trading digital assets. The platform is built on the open source
[Tokenized Protocol](https://tokenized.com/docs/intro/preface), which specifies
how smart legal contracts and financial interactions are represented on the
blockchain. Tokenized provides a first-party app for managing contracts and
assets, and provides the same capabilities in customers’ own financial apps
through a [fully-documented REST API](https://docs.api.tokenized.com). For
customers building web-based apps, the
[Tokenized JavaScript SDK](https://www.npmjs.com/package/@tokenized/sdk-react-private)
handles all the details of the REST API for you, and is the quickest way to
integrate the power of the Tokenized platform.

_This is SDK release **0.3.0**_

This GitHub repository,
[`tokenized/tokenized-sdk-example-react`](https://github.com/tokenized/tokenized-sdk-example-react),
contains a fully-featured, Tokenized-powered web app built to demonstrate, as
clearly as possible, how to use all the features of the
[Tokenized JavaScript SDK](https://www.npmjs.com/package/@tokenized/sdk-react-private).

## Goals

- To make use of the same popular React ecosystem tools you would likely choose
  if you were building a production app.
- To follow the latest best practices in React app development.
- To provide uncomplicated code that you can easily paste into your own app to
  get going quickly.

## Technologies used

- The
  [Tokenized JavaScript SDK for React](https://www.npmjs.com/package/@tokenized/sdk-react-private).
- [Create React App](https://github.com/facebook/create-react-app) provides a
  standard [React](https://reactjs.org) application build setup with
  [Webpack](https://webpack.js.org) and [Babel](https://babeljs.io).
- [React Router](https://reactrouter.com) manages page navigation and the app’s
  URL structure.
- [Redux Toolkit](https://redux-toolkit.js.org/) is used for some minimal
  application state, to demonstrate co-existence with the SDK’s own Redux store.
- [React Intl from FormatJS](https://formatjs.io/docs/react-intl) handles all
  text formatting via message resources (only English strings are currently
  available).
- The [Bulma CSS framework](https://bulma.io/documentation/) is used directly
  with plain JSX (no component library), and custom styling is avoided – just
  the classes provided by the framework.
- [Font Awesome 5 (free)](https://fontawesome.com/v5.15/icons?d=gallery&p=1&m=free)
  provides the icons.

## Running the app

The SDK’s two NPM packages,
[`@tokenized/sdk-js-private`](https://www.npmjs.com/package/@tokenized/sdk-js-private)
and
[`@tokenized/sdk-react-private`](https://www.npmjs.com/package/@tokenized/sdk-js-private),
are currently available only to selected initial partners. To build and run the
example app, you’ll need to be logged in to an NPM account that has been
authorized by the `@tokenized` NPM organization. Use the `npm adduser` command
to set up your credentials.

Clone the repository and install the dependencies:

    git clone git@github.com:tokenized/tokenized-sdk-example-react.git
    cd tokenized-sdk-example-react
    npm install

To run the app in development mode:

    npm start

If Webpack doesn’t open the app in your browser automatically, browse to
[http://localhost:3000](http://localhost:3000). Any changes you save to the code
will be updated live.

---

# Tokenized SDK documentation

## Modules

<dl>
<dt><a href="#module_@tokenized/sdk-react-private">@tokenized/sdk-react-private</a></dt>
<dd><p>Tokenized JavaScript SDK bindings for React</p>
</dd>
<dt><a href="#module_@tokenized/sdk-js-private">@tokenized/sdk-js-private</a></dt>
<dd><p>Tokenized JavaScript SDK, cached queries and mutations (excludes bindings to
specific UI libraries)</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_QueryClient">QueryClient</a></dt>
<dd><p>React Query client</p>
</dd>
</dl>

<a name="module_@tokenized/sdk-react-private"></a>

## @tokenized/sdk-react-private

Tokenized JavaScript SDK bindings for React

- [@tokenized/sdk-react-private](#module_@tokenized/sdk-react-private)
  - [.TokenizedApiProvider](#module_@tokenized/sdk-react-private.TokenizedApiProvider)
  - [.useTokenizedApi()](#module_@tokenized/sdk-react-private.useTokenizedApi) ⇒
    [<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)
  - [.useIsLoading()](#module_@tokenized/sdk-react-private.useIsLoading) ⇒
    <code>boolean</code>
  - [.useIsLoggingIn()](#module_@tokenized/sdk-react-private.useIsLoggingIn) ⇒
    <code>boolean</code>
  - [.useIsLoggedOut()](#module_@tokenized/sdk-react-private.useIsLoggedOut) ⇒
    <code>boolean</code>
  - [.useLogInNeedsMfa()](#module_@tokenized/sdk-react-private.useLogInNeedsMfa)
    ⇒ <code>boolean</code>
  - [.useIsLoggedIn()](#module_@tokenized/sdk-react-private.useIsLoggedIn) ⇒
    <code>boolean</code>
  - [.useLogInError()](#module_@tokenized/sdk-react-private.useLogInError) ⇒
    <code>Error</code>

<a name="module_@tokenized/sdk-react-private.TokenizedApiProvider"></a>

### @tokenized/sdk-react-private.TokenizedApiProvider

`<TokenizedApiProvider>` is a React context provider component, for passing your
[TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi) session manager
down to components that use queries and mutations. Use this once at the top of
your app’s component tree.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)

| Param              | Type                                                                        | Description                                        |
| ------------------ | --------------------------------------------------------------------------- | -------------------------------------------------- |
| props.tokenizedApi | [<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi) | The session manager object you created on startup. |

**Example**

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { TokenizedApi } from '@tokenized/sdk-js-private';
import App from './App';

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
```

<a name="module_@tokenized/sdk-react-private.useTokenizedApi"></a>

### @tokenized/sdk-react-private.useTokenizedApi() ⇒ [<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)

(React hook) providing access to the
[TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi) session manager.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi) -
The session manager you passed into
[`<TokenizedApiProvider>`](TokenizedApiProvider).  
<a name="module_@tokenized/sdk-react-private.useIsLoading"></a>

### @tokenized/sdk-react-private.useIsLoading() ⇒ <code>boolean</code>

(React hook) Initial loading status. Show a loading screen when `useIsLoading`
is `true`.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - Remains `true` until the Tokenized SDK has
finished restoring the session on startup.  
<a name="module_@tokenized/sdk-react-private.useIsLoggingIn"></a>

### @tokenized/sdk-react-private.useIsLoggingIn() ⇒ <code>boolean</code>

(React hook) Current log in process status. Show a spinner and disable user
input on your login screen when `useIsLoggingIn` is `true`.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log in process has started
(credentials entered), but the user has not been fully authenticated yet.  
<a name="module_@tokenized/sdk-react-private.useIsLoggedOut"></a>

### @tokenized/sdk-react-private.useIsLoggedOut() ⇒ <code>boolean</code>

(React hook) Current “no session” status.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when there’s no valid user session,
and also no log in process happening.  
<a name="module_@tokenized/sdk-react-private.useLogInNeedsMfa"></a>

### @tokenized/sdk-react-private.useLogInNeedsMfa() ⇒ <code>boolean</code>

(React hook) Current multi-factor authentication status. Show a prompt to
“Confirm your identity in the authenticator app” on your login screen when
`useLogInNeedsMfa` is `true`.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log in process is polling
for MFA confirmation.  
<a name="module_@tokenized/sdk-react-private.useIsLoggedIn"></a>

### @tokenized/sdk-react-private.useIsLoggedIn() ⇒ <code>boolean</code>

(React hook) Valid user session status. Check this on every normal page of your
app, and switch to the login prompt if `useIsLoggedIn` is `false`.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when a user session is fully
authenticated and not expired, `false` during the log in process, and when
there’s no valid session.  
**Example**

```js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useIsLoggedIn } from '@tokenized/sdk-react-private';

// A wrapper for <Route> from React Router that redirects to a login
// screen if you're not yet authenticated, or the session expires
function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useIsLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
```

<a name="module_@tokenized/sdk-react-private.useLogInError"></a>

### @tokenized/sdk-react-private.useLogInError() ⇒ <code>Error</code>

(React hook) Current log in error. Display the error message on your login
screen to inform the user why their log in attempt was unsuccessful.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>Error</code> - The error that caused a log in attempt to
fail. Cleared to `null` when a new log in process is started.  
<a name="module_@tokenized/sdk-js-private"></a>

## @tokenized/sdk-js-private

Tokenized JavaScript SDK, cached queries and mutations (excludes bindings to
specific UI libraries)

- [@tokenized/sdk-js-private](#module_@tokenized/sdk-js-private)
  - [.TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi)
    - [new TokenizedApi(config)](#new_module_@tokenized/sdk-js-private.TokenizedApi_new)
    - [.account](#module_@tokenized/sdk-js-private.TokenizedApi+account)
    - [.treasury](#module_@tokenized/sdk-js-private.TokenizedApi+treasury)
    - [.contracts](#module_@tokenized/sdk-js-private.TokenizedApi+contracts)
    - [.getQueryClient()](#module_@tokenized/sdk-js-private.TokenizedApi+getQueryClient)
      ⇒ [<code>QueryClient</code>](#external_QueryClient)

<a name="module_@tokenized/sdk-js-private.TokenizedApi"></a>

### @tokenized/sdk-js-private.TokenizedApi

A TokenizedApi object manages user sign-ins and sessions, one at a time, and
provides the user’s Tokenized profile data to your app’s UI code. Create one
TokenizedApi object globally on startup, and pass it as context throughout your
app.

**Kind**: static class of
[<code>@tokenized/sdk-js-private</code>](#module_@tokenized/sdk-js-private)

- [.TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi)
  - [new TokenizedApi(config)](#new_module_@tokenized/sdk-js-private.TokenizedApi_new)
  - [.account](#module_@tokenized/sdk-js-private.TokenizedApi+account)
  - [.treasury](#module_@tokenized/sdk-js-private.TokenizedApi+treasury)
  - [.contracts](#module_@tokenized/sdk-js-private.TokenizedApi+contracts)
  - [.getQueryClient()](#module_@tokenized/sdk-js-private.TokenizedApi+getQueryClient)
    ⇒ [<code>QueryClient</code>](#external_QueryClient)

<a name="new_module_@tokenized/sdk-js-private.TokenizedApi_new"></a>

#### new TokenizedApi(config)

Create a new object to manage Tokenized user sessions:

- Do this once on app startup
- On construction, the last session will be restored (asynchronously) from
  LocalStorage, if possible.
- On construction, the account status will be `loading`.
- After session restore, the account status will transition to `loggedIn` or
  `loggedOut`.

| Param                             | Type                                       | Description                                                                                                                                                                                                                                                                                     |
| --------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config                            | <code>object</code>                        | Configuration for the session. All properties are optional. With no configuration, the session will connect to the Tokenized production back end.                                                                                                                                               |
| config.platformApiKey             | <code>string</code> \| <code>object</code> | Specify your API public key, assigned to you by Tokenized, providing access to your individual tenant. The default is the Tokenized tenant (same user accounts as the Tokenized app). You can specify an object to provide multiple keys, one for each back end.                                |
| config.platformApiKey.development | <code>string</code>                        | Your API public key for the development back end.                                                                                                                                                                                                                                               |
| config.platformApiKey.test        | <code>string</code>                        | Your API public key for the development back end.                                                                                                                                                                                                                                               |
| config.platformApiKey.production  | <code>string</code>                        | Your API public key for the production back end.                                                                                                                                                                                                                                                |
| config.tokenizedBackend           | <code>string</code>                        | `development`, `test`, or `production`. Each back end has separate user accounts. Default is `production`.                                                                                                                                                                                      |
| config.applicationIdentifier      | <code>string</code>                        | Identifies your app in authentication requests. Default is `tokenized-sdk`.                                                                                                                                                                                                                     |
| config.errorTransform             | <code>function</code>                      | Optionally provide a function that will be called whenever the SDK detects an error (single argument will be the `Error` object). Typically used to report the error to a monitoring service. If you return a value from the function, that value will be thrown instead of the original error. |
| config.locale                     | <code>string</code>                        | Specifies the locale to use for messages and number formatting, for example `locale: 'en-GB'`. By default the browser’s current language will be used.                                                                                                                                          |

**Example**

```js
import { TokenizedApi } from '@tokenized/sdk-js-private';
const tokenizedApi = new TokenizedApi({
  tokenizedBackend: 'development',
  applicationIdentifier: 'tokenized-example-react',
});
```

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account"></a>

#### tokenizedApi.account

Manages the sign in process

**Kind**: instance property of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+treasury"></a>

#### tokenizedApi.treasury

Access to the user’s balances and assets

**Kind**: instance property of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+contracts"></a>

#### tokenizedApi.contracts

Access to the user’s contracts

**Kind**: instance property of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+getQueryClient"></a>

#### tokenizedApi.getQueryClient() ⇒ [<code>QueryClient</code>](#external_QueryClient)

Provides the
[React Query `QueryClient` object](https://react-query.tanstack.com/reference/QueryClient)
that manages the API data cache for the current user session. Use to observe
query data and perform mutations.

**Kind**: instance method of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="external_QueryClient"></a>

## QueryClient

React Query client

**Kind**: global external  
**See**: https://react-query.tanstack.com/reference/QueryClient

---

# Release notes

The SDK is always released together in three parts:
[`@tokenized/sdk-js-private` (NPM package)](https://www.npmjs.com/package/@tokenized/sdk-js-private),
[`@tokenized/sdk-react-private` (NPM package)](https://www.npmjs.com/package/@tokenized/sdk-js-private),
and
[`tokenized/tokenized-sdk-example-react` (GitHub repo)](https://github.com/tokenized/tokenized-sdk-example-react).

- **`0.3.0` 2021-05-24** — Fully-functional querying and formatting of treasury
  balance lists, and initial support for listing contracts, using React Query
  for data fetching. Internationalization support with React Intl (FormatJS).
- **`0.2.0` 2021-05-11** — Some bug fixes and tidy-up.
- **`0.1.0` 2021-05-10** — Initial version published. Functional log in process
  including MFA.
