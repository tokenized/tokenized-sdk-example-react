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

_This is **SDK release 0.4.0**, an early-access preview release with many
features not yet implemented. At this early stage significant changes are
possible to the SDK interface between releases._

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
<dt><a href="#external_react-query">react-query</a></dt>
<dd><p>The React Query framework is used by the SDK to handle fetching and mutating
model data with the Tokenized REST API, with automatic retries and
re-fetching. Some knowledge of how React Query works is useful, since the SDK
exposes some of its details directly, like the <code>UseQueryResult</code> objects
returned by the <code>@tokenized/sdk-react-private</code> query hooks.</p>
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
  - [.useIsWaitingForDevicePairing()](#module_@tokenized/sdk-react-private.useIsWaitingForDevicePairing)
    ⇒ <code>boolean</code>
  - [.DevicePairingCode()](#module_@tokenized/sdk-react-private.DevicePairingCode)
  - [.useIsLoggedIn()](#module_@tokenized/sdk-react-private.useIsLoggedIn) ⇒
    <code>boolean</code>
  - [.useLogInError()](#module_@tokenized/sdk-react-private.useLogInError) ⇒
    <code>Error</code>
  - [.useOwnFormattedName()](#module_@tokenized/sdk-react-private.useOwnFormattedName)
    ⇒ <code>string</code>
  - [.useCurrentProfileName()](#module_@tokenized/sdk-react-private.useCurrentProfileName)
    ⇒ <code>string</code>
  - [.usePrimaryVault()](#module_@tokenized/sdk-react-private.usePrimaryVault) ⇒
    [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)
  - [.useContracts()](#module_@tokenized/sdk-react-private.useContracts) ⇒
    [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)
  - [.useFilteredBalances(vaultId, filterOptions)](#module_@tokenized/sdk-react-private.useFilteredBalances)
    ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

<a name="module_@tokenized/sdk-react-private.TokenizedApiProvider"></a>

### @tokenized/sdk-react-private.TokenizedApiProvider

`<TokenizedApiProvider>` is a React context provider component, for passing your
[TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi) session manager
down to components that use queries and mutations. Use this once at the top of
your app’s component tree.

#### Devtools

The SDK caches model data with [React Query](https://react-query.tanstack.com)
and stores state using [Redux](https://redux.js.org). To avoid confusion with
your app’s usage of these frameworks, devtools support is turned off by default.
If you’d like to view the SDK’s internal state in development builds, run this
code in your browser’s console, and reload:

    window.localStorage.setItem('tokenized-sdk-devtools-enable', 'true');

The React Query devtools are rendered inside the `<TokenizedApiProvider>`
component. In the Redux devtools browser extension, you should be able to select
`Tokenized SDK` from the list of stores. To turn the devtools off again, run:

    window.localStorage.removeItem('tokenized-sdk-devtools-enable');

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

**`React hook`** providing access to the
[TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi) session manager.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi) -
The session manager you passed into
[`<TokenizedApiProvider>`](TokenizedApiProvider).  
<a name="module_@tokenized/sdk-react-private.useIsLoading"></a>

### @tokenized/sdk-react-private.useIsLoading() ⇒ <code>boolean</code>

**`React hook`** Initial loading status. Show a loading screen when
`useIsLoading` is `true`.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - Remains `true` until the Tokenized SDK has
finished restoring the session on startup.  
<a name="module_@tokenized/sdk-react-private.useIsLoggingIn"></a>

### @tokenized/sdk-react-private.useIsLoggingIn() ⇒ <code>boolean</code>

**`React hook`** Current log in process status. Show a spinner and disable user
input on your login screen when `useIsLoggingIn` is `true`.

_Note that in an upcoming release of the SDK, log in will be handled by a
redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log in process has started
(credentials entered), but the user has not been fully authenticated yet.  
<a name="module_@tokenized/sdk-react-private.useIsLoggedOut"></a>

### @tokenized/sdk-react-private.useIsLoggedOut() ⇒ <code>boolean</code>

**`React hook`** Current “no session” status.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when there’s no valid user session,
and also no log in process happening.  
<a name="module_@tokenized/sdk-react-private.useLogInNeedsMfa"></a>

### @tokenized/sdk-react-private.useLogInNeedsMfa() ⇒ <code>boolean</code>

**`React hook`** Current multi-factor authentication status. Show a prompt to
“Confirm your identity in the authenticator app” on your login screen when
`useLogInNeedsMfa` is `true`.

_Note that in an upcoming release of the SDK, log in (including MFA) will be
handled by a redirect to a secure, Tokenized-hosted mini-web-app, and this hook
will no longer be necessary._

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log in process is polling
for MFA confirmation.  
<a name="module_@tokenized/sdk-react-private.useIsWaitingForDevicePairing"></a>

### @tokenized/sdk-react-private.useIsWaitingForDevicePairing() ⇒ <code>boolean</code>

**`React hook`** Authenticator device pairing status. Show the pairing QR code
and a prompt to “Scan this code with the authenticator app” on your login screen
when `useIsWaitingForDevicePairing` is `true`.

_Note that in an upcoming release of the SDK, device pairing will be handled by
a redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when a device pairing process is
active.  
<a name="module_@tokenized/sdk-react-private.DevicePairingCode"></a>

### @tokenized/sdk-react-private.DevicePairingCode()

`<DevicePairingCode>` is a React component that renders the authenticator device
pairing QR code. Present this to the user and prompt them to “Scan this code
with the authenticator app”.

_Note that in an upcoming release of the SDK, device pairing will be handled by
a redirect to a secure, Tokenized-hosted mini-web-app, and this component will
no longer be necessary._

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)

| Param        | Type                | Default          | Description                                                         |
| ------------ | ------------------- | ---------------- | ------------------------------------------------------------------- |
| [props.size] | <code>number</code> | <code>256</code> | The dimensions of the (square) QR code, in pixels. Default is `256` |

<a name="module_@tokenized/sdk-react-private.useIsLoggedIn"></a>

### @tokenized/sdk-react-private.useIsLoggedIn() ⇒ <code>boolean</code>

**`React hook`** Valid user session status. Check this on every normal page of
your app, and switch to the login prompt if `useIsLoggedIn` is `false`.

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

**`React hook`** Current log in error. Display the error message on your login
screen to inform the user why their log in attempt was unsuccessful.

_Note that in an upcoming release of the SDK, log in will be handled by a
redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>Error</code> - The error that caused a log in attempt to
fail. Cleared to `null` when a new log in process is started.  
<a name="module_@tokenized/sdk-react-private.useOwnFormattedName"></a>

### @tokenized/sdk-react-private.useOwnFormattedName() ⇒ <code>string</code>

**`React hook`** The full name of the authenticated user. Display the user’s
name in an account menu, for example. The name is available as soon as the login
credentials are verified, so you can display it in the MFA prompt before full
authentication.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>string</code> - The user’s full name  
<a name="module_@tokenized/sdk-react-private.useCurrentProfileName"></a>

### @tokenized/sdk-react-private.useCurrentProfileName() ⇒ <code>string</code>

**`React hook`** The name of the user’s current profile. Display in an account
menu next to the user’s name. Currently the profile name will always be
“Individual”.

#### About profiles

The SDK interacts with a single current profile per session, providing
management of the vaults, assets, and contracts allowed by the user’s role
within the entity selected by the profile. _Currently only the user’s personal
“Individual” entity and its default profile is supported._

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>string</code> - The current profile name  
<a name="module_@tokenized/sdk-react-private.usePrimaryVault"></a>

### @tokenized/sdk-react-private.usePrimaryVault() ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

**`React hook`** Provides information about the primary vault in the user’s
current profile. Pass the `id` of the vault into
[`useFilteredBalances`](#module_@tokenized/sdk-react-private.useFilteredBalances)
to get a list of the assets in the vault.

_Currently only a single primary vault is supported per profile._

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>UseQueryResult</code>](#external_react-query.UseQueryResult) - The user’s
primary vault as the `data` property within a React Query
[`UseQueryResult`](#external_react-query.UseQueryResult) object. For example
(not all query status properties shown):

```js
{
  "isLoading": false,
  "data": {
    "id": "432b199b-1f71-42bf-ba0b-33d512afa9de",
    "name": "Primary",
    "isPrimary": true,
    "isActive": true,
    "isDeleted": false,
    "dateCreated": 1603874542197,
    "dateModified": 1622130022588,
    "profileId": "dc1fb13c-e586-433b-b7f1-68fbb0e8a941",
    "profileName": "Individual"
    "profileIndex": 0,
    "entityId": "ae0cfeac-4316-456e-abaf-c3568e7e67b9",
    "displayHandle": "hankrearden@tokenized.id",
    "displayName": "Hank Rearden"
  },
  "error": null
}
```

<a name="module_@tokenized/sdk-react-private.useContracts"></a>

### @tokenized/sdk-react-private.useContracts() ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

**`React hook`** Provides a list of the contracts accessible in the current
profile, including all those that the profile’s entity is a counterparty to, and
the contracts for all assets held by the entity. The list includes contracts
that can be edited and contracts that can only be viewed.

_The contract data structure is not finalized, and will be reorganized and
transformed for easier usage in a future SDK release._

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>UseQueryResult</code>](#external_react-query.UseQueryResult) - The data
property of the [`UseQueryResult`](#external_react-query.UseQueryResult) object
is the list of contracts in an object, where the keys are the contract addresses
and the values are the contract objects. For example (not all properties shown):

```js
{
  "isLoading": false,
  "data": {
    "1CSLw5EY7CGenvXhiU7RUPsDvQjd7BkpZj": {
      "contractAddress": "1CSLw5EY7CGenvXhiU7RUPsDvQjd7BkpZj",
      "name": "Chapters Dev 3",
      "contractType": "COU",
      "issuer": { "name": "Hank Rearden" },
      "issuerHandle": "hankrearden@tokenized.id",
      "bodyOfAgreement": {
        "bodyOfAgreementFormation": {
          "chapters": [
            {
              "title": "Chapter 1",
              "preamble": "First preamble",
              "articles": [
                {
                  "title": "An article.",
                  "body": "And an article body",
                  "children": [
                    { "title": "A section.", "body": "Another body" }
                  ]
                },
                { "title": "Another article.", "body": "Another body" }
              ]
            },
            {
              "title": "Chapter 2",
              "preamble": "Second preamble",
              "articles": [
                {
                  "title": "An article.",
                  "body": "More body",
                  "children": [
                    {
                      "title": "Another section.",
                      "body": "Another section body"
                    }
                  ]
                }
              ]
            }
          ],
          "timestamp": 1614444222322.359
        }
      }
    }
  },
  "error": null
}
```

<a name="module_@tokenized/sdk-react-private.useFilteredBalances"></a>

### @tokenized/sdk-react-private.useFilteredBalances(vaultId, filterOptions) ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

**`React hook`** Filtered and sorted list of the quantities (balances) of assets
and liabilities in a specified vault. While the hook is mounted, balances will
be refreshed automatically **every 60 seconds**.

Each object in the results array describes a selection of relevant quantities
for the particular asset:

- `balance`: Quantity of the asset held in this vault
- `reserved`: Quantity of balance reserved for pending transactions
- `authorizedQuantity`: Total quantity of asset in existence
- `unitValue`: The value of one “unit” of the asset
- `issuedLiability`: For the entity’s own assets: the quantity issued to others
- `value`: The quantity of the asset issued to this vault

Every quantity provides the necessary information to format the number in a
variety of different ways, depending on your requirements:

- `tokens`: the quantity in the natural units of the asset – “48 coupons”.
- `assetCurrency`: the value of the assets in their own currencies, if specified
  – “$59,184.00”.
- `displayCurrency`: the value of the assets converted to the user’s selected
  display currency (the currency can be overridden in the `filterOptions`
  argument) – “£41,737.68”.

For the currency quantities, `NumberFormatOptions` objects are provided that can
be passed directly (or with your own modifications) to
[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)
for localized currency formatting.

**Kind**: static method of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>UseQueryResult</code>](#external_react-query.UseQueryResult) - An array
of balances as the `data` property within a React Query
[`UseQueryResult`](#external_react-query.UseQueryResult) object. Refer to the
example for details of the data structure and how to use it.

| Param                             | Type                 | Description                                                                                                                                                                                                                                                                         |
| --------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vaultId                           | <code>string</code>  | The id of the vault to query for balances. The id of the user’s primary vault can be obtained via [`usePrimaryVault()?.id`](#module_@tokenized/sdk-react-private.usePrimaryVault).                                                                                                  |
| filterOptions                     | <code>object</code>  |                                                                                                                                                                                                                                                                                     |
| filterOptions.includeLiabilities  | <code>boolean</code> | Asset/liability filtering: Set `includeLiabilities: true` to only include assets created by the current entity. Set `includeLiabilities: false` to only include assets issued to the current entity by another entity, Omit `includeLiabilities` to include assets and liabilities. |
| filterOptions.includeInactive     | <code>boolean</code> | Active/inactive filtering: Set `includeInactive: true` to only include assets that are inactive or expired. Set `includeInactive: false` to only include assets that are active and not expired. Omit `includeInactive` to include active and inactive assets.                      |
| filterOptions.displayCurrencyCode | <code>string</code>  | Override the display currency from the user’s profile for currency conversions. For example setting `displayCurrencyCode: 'USD'` will return quantities with display currency conversions to US dollars.                                                                            |

**Example**

```js
import React from 'react';
import {
  usePrimaryVault,
  useFilteredBalances,
} from '@tokenized/sdk-react-private';

export default function BalancesExample() {
  const vault = usePrimaryVault();
  const vaultId = vault && vault.id;
  const balances =
    useFilteredBalances(vaultId, {
      includeLiabilities: undefined,
      includeInactive: false,
    }) || {};

  if (balances.isLoading) {
    return <p>Loading…</p>;
  }

  return (
    <div className="content">
      <ul>
        {balances.data &&
          balances.data.map((balanceData) => {
            const {
              assetId, // "COUEtBdhD4FHnm6FT7wyNnMnPH7aBbMfJPMk"
              assetName, // "Example coupon"
              assetType: {
                code: assetTypeCode, // "COU"
                formatted: assetTypeName, // "Coupon"
              },
              isActive,
              isExpired,
              isLiability,
              quantities,
              contract: {
                address: contractAddress, // "16zB7rCnWLm8PhfiVGaux1cLiVdZinNF2v"
                formatted: contractName, // "Example coupon contract"
              } = {},
              issuer: {
                entityId: issuerId, // "468136c8-4a90-4181-8dc1-508893171b15"
                formatted: issuerName, // "Martina Probst"
              } = {},
            } = balanceData;

            const {
              balance, // Quantity of the asset held in this vault
              reserved, // Quantity of balance reserved for pending transactions
              authorizedQuantity, // Total quantity of asset in existence
              unitValue, // The value of one “unit” of the asset
              issuedLiability, // For the entity’s own assets: the quantity issued to others
              value, // The quantity of the asset issued to this vault
            } = quantities;

            return (
              <li key={assetId}>
                {assetName} ({assetTypeName})
                <ul>
                  <li>
                    balance: <FormatQuantity quantity={balance} />
                  </li>
                  <li>
                    reserved: <FormatQuantity quantity={reserved} />
                  </li>
                  <li>
                    authorizedQuantity:{' '}
                    <FormatQuantity quantity={authorizedQuantity} />
                  </li>
                  <li>
                    unitValue: <FormatQuantity quantity={unitValue} />
                  </li>
                  <li>
                    issuedLiability:{' '}
                    <FormatQuantity quantity={issuedLiability} />
                  </li>
                  <li>
                    value: <FormatQuantity quantity={value} />
                  </li>
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

function FormatQuantity({ quantity }) {
  const {
    tokens: {
      // "48 coupons"
      number: tokenNumber,
      formatted: tokenFormatted,
    } = {},
    assetCurrency: {
      // "$59,184.00"
      number: assetCurrencyNumber,
      NumberFormatOptions: assetCurrencyOptions,
    } = {},
    displayCurrency: {
      // "£41,737.68"
      number: displayCurrencyNumber,
      NumberFormatOptions: displayCurrencyOptions,
    } = {},
  } = quantity || {};

  const formats = [];
  if (tokenFormatted) {
    formats.push(tokenFormatted);
  }
  if (assetCurrencyOptions) {
    formats.push(
      new Intl.NumberFormat(undefined, assetCurrencyOptions).format(
        assetCurrencyNumber,
      ),
    );
  }
  if (displayCurrencyOptions) {
    formats.push(
      new Intl.NumberFormat(undefined, displayCurrencyOptions).format(
        displayCurrencyNumber,
      ),
    );
  }
  return formats.join(', ');
}
```

<a name="module_@tokenized/sdk-js-private"></a>

## @tokenized/sdk-js-private

Tokenized JavaScript SDK, cached queries and mutations (excludes bindings to
specific UI libraries)

- [@tokenized/sdk-js-private](#module_@tokenized/sdk-js-private)
  - [.TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi)
    - [new TokenizedApi(config)](#new_module_@tokenized/sdk-js-private.TokenizedApi_new)
    - [.treasury](#module_@tokenized/sdk-js-private.TokenizedApi+treasury)
    - [.contracts](#module_@tokenized/sdk-js-private.TokenizedApi+contracts)
    - [.account](#module_@tokenized/sdk-js-private.TokenizedApi+account)
      - [.logIn(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+logIn)
      - [.initiateDevicePairing()](#module_@tokenized/sdk-js-private.TokenizedApi+account+initiateDevicePairing)
      - [.createNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+createNewAccount)
      - [.verifyNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+verifyNewAccount)
      - [.logOut()](#module_@tokenized/sdk-js-private.TokenizedApi+account+logOut)
      - [.getUserHandlePostfix()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getUserHandlePostfix)
        ⇒ <code>string</code>
    - [.getQueryClient()](#module_@tokenized/sdk-js-private.TokenizedApi+getQueryClient)
      ⇒ [<code>QueryClient</code>](#external_react-query.QueryClient)

<a name="module_@tokenized/sdk-js-private.TokenizedApi"></a>

### @tokenized/sdk-js-private.TokenizedApi

A TokenizedApi object manages user sign-ins and sessions, one at a time, and
provides the user’s Tokenized profile data to your app’s UI code. Create one
TokenizedApi object globally on startup, and pass it as context throughout your
app.

#### Devtools

The SDK stores state using [Redux](https://redux.js.org). Devtools support for
the internal store is turned off by default. If you’d like to view the SDK’s
internal state in development builds, run this code in your browser’s console,
and reload:

    window.localStorage.setItem('tokenized-sdk-devtools-enable', 'true');

In the Redux devtools browser extension, you should be able to select
`Tokenized SDK` from the list of stores. To turn devtools support off again,
run:

    window.localStorage.removeItem('tokenized-sdk-devtools-enable');

**Kind**: static class of
[<code>@tokenized/sdk-js-private</code>](#module_@tokenized/sdk-js-private)

- [.TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi)
  - [new TokenizedApi(config)](#new_module_@tokenized/sdk-js-private.TokenizedApi_new)
  - [.treasury](#module_@tokenized/sdk-js-private.TokenizedApi+treasury)
  - [.contracts](#module_@tokenized/sdk-js-private.TokenizedApi+contracts)
  - [.account](#module_@tokenized/sdk-js-private.TokenizedApi+account)
    - [.logIn(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+logIn)
    - [.initiateDevicePairing()](#module_@tokenized/sdk-js-private.TokenizedApi+account+initiateDevicePairing)
    - [.createNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+createNewAccount)
    - [.verifyNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+verifyNewAccount)
    - [.logOut()](#module_@tokenized/sdk-js-private.TokenizedApi+account+logOut)
    - [.getUserHandlePostfix()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getUserHandlePostfix)
      ⇒ <code>string</code>
  - [.getQueryClient()](#module_@tokenized/sdk-js-private.TokenizedApi+getQueryClient)
    ⇒ [<code>QueryClient</code>](#external_react-query.QueryClient)

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

<a name="module_@tokenized/sdk-js-private.TokenizedApi+treasury"></a>

#### tokenizedApi.treasury

Access to balances and assets

**Kind**: instance property of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+contracts"></a>

#### tokenizedApi.contracts

Access to contracts

**Kind**: instance property of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account"></a>

#### tokenizedApi.account

**Kind**: instance property of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)

- [.account](#module_@tokenized/sdk-js-private.TokenizedApi+account)
  - [.logIn(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+logIn)
  - [.initiateDevicePairing()](#module_@tokenized/sdk-js-private.TokenizedApi+account+initiateDevicePairing)
  - [.createNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+createNewAccount)
  - [.verifyNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+verifyNewAccount)
  - [.logOut()](#module_@tokenized/sdk-js-private.TokenizedApi+account+logOut)
  - [.getUserHandlePostfix()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getUserHandlePostfix)
    ⇒ <code>string</code>

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+logIn"></a>

##### account.logIn(options)

Begin a new asynchronous log in process with the specified account credentials.
If a log in attempt is currently in progress, it will be cancelled and replaced
with the new one. Fails if there’s already a valid authenticated session.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)

| Param               | Type                | Description                                                                                                                                                                                                                                                                                                                 |
| ------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options             | <code>object</code> |                                                                                                                                                                                                                                                                                                                             |
| options.handle      | <code>string</code> | Joined with the [user handle postfix](module:@tokenized/sdk-js-private.TokenizedApi#account.getUserHandlePostfix) to identify the account. So for example specifying `handle: 'hankrearden'` will log in as `hankrearden@tokenized.id` on the production back end. Specify only one of `handle`, `phoneNumber`, or `email`. |
| options.phoneNumber | <code>string</code> | Identifies the account to log into using the phone number registered to the account. Specify only one of `handle`, `phoneNumber`, or `email`.                                                                                                                                                                               |
| options.email       | <code>string</code> | Identifies the account to log into using the email address registered to the account. Specify only one of `handle`, `phoneNumber`, or `email`.                                                                                                                                                                              |
| options.passphrase  | <code>string</code> | The passphrase to authenticate the user’s account.                                                                                                                                                                                                                                                                          |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+initiateDevicePairing"></a>

##### account.initiateDevicePairing()

Generate a new one-time password to start the device pairing process. During
sign in, this will be done automatically if the user has no active authenticator
devices. Use this function when the user explicitly chooses to re-pair, or if
you need to regenerate an expired code.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+createNewAccount"></a>

##### account.createNewAccount(options)

Start a new account creation process. This will send a confirmation email
containing a code that must be passed into `confirmNewAccount` to allow the
account creation to take place.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)

| Param                     | Type                | Description                                                                                                                                                                                                                                                                     |
| ------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                   | <code>object</code> |                                                                                                                                                                                                                                                                                 |
| options.firstName         | <code>string</code> | First name of the user creating the account.                                                                                                                                                                                                                                    |
| options.lastName          | <code>string</code> | Last name of the user creating the account.                                                                                                                                                                                                                                     |
| options.handle            | <code>string</code> | Joined with the [user handle postfix](module:@tokenized/sdk-js-private.TokenizedApi#account.getUserHandlePostfix) to identify the new account. So for example specifying `handle: 'hankrearden'` will create the account `hankrearden@tokenized.id` on the production back end. |
| options.email             | <code>string</code> | Used to verify the person creating the account, by sending a confirmation code.                                                                                                                                                                                                 |
| options.passphrase        | <code>string</code> | The passphrase for the new account.                                                                                                                                                                                                                                             |
| options.passphraseConfirm | <code>string</code> | The passphrase for the new account.                                                                                                                                                                                                                                             |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+verifyNewAccount"></a>

##### account.verifyNewAccount(options)

Verify creation of a new account by providing the code sent to the account email
address (triggered by an earlier call to `createNewAccount`). If the code is
correct, the new account will be created. The next step is to log in, which will
trigger the authenticator device pairing process.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)

| Param         | Type                | Description                                          |
| ------------- | ------------------- | ---------------------------------------------------- |
| options       | <code>object</code> |                                                      |
| options.email | <code>string</code> | The email address of the new account to be verified. |
| options.code  | <code>string</code> | The verification code from the received email.       |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+logOut"></a>

##### account.logOut()

End the current authenticated session and clear all internal state associated
with it. If a log in attempt is currently in progress then cancel it.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+getUserHandlePostfix"></a>

##### account.getUserHandlePostfix() ⇒ <code>string</code>

Returns the string that will be appended to user handles to form an account
identifier for log in. Display this in your log in dialog when prompting the
user for a handle. Since the postfix is determined by the back end
(`production`, `test`, or `development`), it remains fixed for the lifetime of
each `TokenizedApi` object.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
**Returns**: <code>string</code> - The handle postfix, for example
`'@tokenized.id'`.  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+getQueryClient"></a>

#### tokenizedApi.getQueryClient() ⇒ [<code>QueryClient</code>](#external_react-query.QueryClient)

Provides the
[React Query `QueryClient` object](https://react-query.tanstack.com/reference/QueryClient)
that manages the API data cache for the current user session. Use to observe
query data and perform mutations.

**Kind**: instance method of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="external_react-query"></a>

## react-query

The React Query framework is used by the SDK to handle fetching and mutating
model data with the Tokenized REST API, with automatic retries and re-fetching.
Some knowledge of how React Query works is useful, since the SDK exposes some of
its details directly, like the `UseQueryResult` objects returned by the
`@tokenized/sdk-react-private` query hooks.

**Kind**: global external  
**See**: https://react-query.tanstack.com/overview

- [react-query](#external_react-query)
  - [.UseQueryResult](#external_react-query.UseQueryResult)
  - [.QueryClient](#external_react-query.QueryClient)

<a name="external_react-query.UseQueryResult"></a>

### react-query.UseQueryResult

The query hooks in `@tokenized/sdk-react-private` return information about the
status of a query, including the data once it becomes available, in a
`UseQueryResult` object that’s defined by the `UseQuery` hook from
[React Query](#external_react-query). Amongst other things, the object provides:

- `.loading`: A boolean that’s `true` while the query fetches its first results.
  You can use this flag to display a loading spinner.
- `.data`: The latest query results, once they’re available.
- `.error`: The error object if the query fails.

**Kind**: static typedef of [<code>react-query</code>](#external_react-query)  
**See**: https://react-query.tanstack.com/reference/useQuery  
<a name="external_react-query.QueryClient"></a>

### react-query.QueryClient

The `QueryClient` object encapsulates a React Query data cache. It provides
(amongst many other things):

- [`queryClient.fetchQuery`](https://react-query.tanstack.com/reference/QueryClient#queryclientfetchquery):
  A way to run one-off queries directly, caching the results.
- The `QueryClient` object can be used to construct a
  [`QueryObserver`](https://react-query.tanstack.com/reference/QueryObserver)
  for a particular query, which can then be bound to UI using the observer
  pattern.

**Kind**: static typedef of [<code>react-query</code>](#external_react-query)  
**See**: https://react-query.tanstack.com/reference/QueryClient

---

# Release notes

The SDK is always released together in three parts:
[`@tokenized/sdk-js-private` (NPM package)](https://www.npmjs.com/package/@tokenized/sdk-js-private),
[`@tokenized/sdk-react-private` (NPM package)](https://www.npmjs.com/package/@tokenized/sdk-js-private),
and
[`tokenized/tokenized-sdk-example-react` (GitHub repo)](https://github.com/tokenized/tokenized-sdk-example-react).

- **`0.4.0` 2021-05-31** — First customer preview release. Treasury balance list
  structure redesigned to provide all relevant quantities precalculated with
  highly flexible formatting and currency conversions. Full documentation of the
  library interfaces is now built into the READMEs.
- **`0.3.0` 2021-05-24** — Fully-functional querying and formatting of treasury
  balance lists, and initial support for listing contracts, using React Query
  for data fetching. Internationalization support with React Intl (FormatJS).
- **`0.2.0` 2021-05-11** — Some bug fixes and tidy-up.
- **`0.1.0` 2021-05-10** — Initial version published. Functional log in process
  including MFA.
