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

_This is **SDK release 0.5.5**, an early-access preview release with many
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
- [Webpack](https://webpack.js.org) is used to bundle the application’s code and
  resources to run in the browser.
- [Babel](https://babeljs.io) transpiles JavaScript to a form understood by the
  browser.
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
<dt><a href="#external_zxcvbn">zxcvbn</a></dt>
<dd><p>A password strength estimator that identifies the patterns used in common
weak passwords exploited by password crackers. Note that <code>zxcvbn</code> includes a
significant amount of static string data, and so installing
<code>@tokenized/sdk-js-private</code> can increase your Webpack bundle size by several
hundred kilobytes.</p>
</dd>
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
  - _components_
    - [.DevicePairingCode](#module_@tokenized/sdk-react-private.DevicePairingCode)
    - [.TokenizedApiProvider](#module_@tokenized/sdk-react-private.TokenizedApiProvider)
    - [.Avatar](#module_@tokenized/sdk-react-private.Avatar)
  - _hooks_
    - [.useTokenizedApi](#module_@tokenized/sdk-react-private.useTokenizedApi) ⇒
      [<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)
  - _hooks/account_
    - [.useCurrentProfileName](#module_@tokenized/sdk-react-private.useCurrentProfileName)
      ⇒ <code>string</code>
    - [.useOwnFormattedName](#module_@tokenized/sdk-react-private.useOwnFormattedName)
      ⇒ <code>string</code>
  - _hooks/activity_
    - [.useActivity](#module_@tokenized/sdk-react-private.useActivity) ⇒
      [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)
    - [.useActivityEvent](#module_@tokenized/sdk-react-private.useActivityEvent)
      ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)
  - _hooks/contact_
    - [.useContact](#module_@tokenized/sdk-react-private.useContact)
    - [.useHandles](#module_@tokenized/sdk-react-private.useHandles)
  - _hooks/contracts_
    - [.useContracts](#module_@tokenized/sdk-react-private.useContracts) ⇒
      [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)
  - _hooks/login_
    - [.useIsLoading](#module_@tokenized/sdk-react-private.useIsLoading) ⇒
      <code>boolean</code>
    - [.useIsLoggedIn](#module_@tokenized/sdk-react-private.useIsLoggedIn) ⇒
      <code>boolean</code>
    - [.useIsLoggedOut](#module_@tokenized/sdk-react-private.useIsLoggedOut) ⇒
      <code>boolean</code>
    - [.useIsLoggingIn](#module_@tokenized/sdk-react-private.useIsLoggingIn) ⇒
      <code>boolean</code>
    - [.useIsWaitingForDevicePairing](#module_@tokenized/sdk-react-private.useIsWaitingForDevicePairing)
      ⇒ <code>boolean</code>
    - [.useLogInError](#module_@tokenized/sdk-react-private.useLogInError) ⇒
      <code>Error</code>
    - [.useLogInNeedsMfa](#module_@tokenized/sdk-react-private.useLogInNeedsMfa)
      ⇒ <code>boolean</code>
    - [.useLogInNeedsRestoreRootKey](#module_@tokenized/sdk-react-private.useLogInNeedsRestoreRootKey)
      ⇒ <code>boolean</code>
    - [.useLogInNeedsSeedPhraseBackup](#module_@tokenized/sdk-react-private.useLogInNeedsSeedPhraseBackup)
      ⇒ <code>boolean</code>
    - [.useLogInNeedsVerifyEmail](#module_@tokenized/sdk-react-private.useLogInNeedsVerifyEmail)
      ⇒ <code>boolean</code>
    - [.useLogInProgress](#module_@tokenized/sdk-react-private.useLogInProgress)
      ⇒ <code>object</code>
    - [.useResetPassphraseMaskedEmail](#module_@tokenized/sdk-react-private.useResetPassphraseMaskedEmail)
      ⇒ <code>string</code>
    - [.useSeedPhraseWordsForBackup](#module_@tokenized/sdk-react-private.useSeedPhraseWordsForBackup)
      ⇒ <code>Array.&lt;string&gt;</code>
    - [.useVerificationEmailAddress](#module_@tokenized/sdk-react-private.useVerificationEmailAddress)
      ⇒ <code>string</code>
  - _hooks/transfer_
    - [.useConfirmSendAsset](#module_@tokenized/sdk-react-private.useConfirmSendAsset)
    - [.usePrepareSendAsset](#module_@tokenized/sdk-react-private.usePrepareSendAsset)
    - [.useSendMaxEstimate](#module_@tokenized/sdk-react-private.useSendMaxEstimate)
  - _hooks/treasury_
    - [.useFilteredBalances](#module_@tokenized/sdk-react-private.useFilteredBalances)
      ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)
    - [.usePrimaryVault](#module_@tokenized/sdk-react-private.usePrimaryVault) ⇒
      [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

<a name="module_@tokenized/sdk-react-private.DevicePairingCode"></a>

### @tokenized/sdk-react-private.DevicePairingCode

`<DevicePairingCode>` is a React component that renders the authenticator device
pairing QR code. Present this to the user and prompt them to “Scan this code
with the authenticator app”.

_Note that in an upcoming release of the SDK, device pairing will be handled by
a redirect to a secure, Tokenized-hosted mini-web-app, and this component will
no longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Category**: components

| Param        | Type                | Default          | Description                                                         |
| ------------ | ------------------- | ---------------- | ------------------------------------------------------------------- |
| [props.size] | <code>number</code> | <code>256</code> | The dimensions of the (square) QR code, in pixels. Default is `256` |

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
**Category**: components

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

<a name="module_@tokenized/sdk-react-private.Avatar"></a>

### @tokenized/sdk-react-private.Avatar

**`React Component`** Render a user's avatar image

Props:

- `handle`: A user's handle, eg "user.name@tokenized.id"
- `renderMissing`: Optional. Called when a user's contact is not yet loaded or
  in case of error
- `render`: Optional. Called when a user's contact is loaded, or if
  `renderMissing` is not supplied

If an appropriate render prop is not supplied then an <img> will be rendered.

Rendering props (passed to the render or renderMissing functions):

- `src`: The URL of an image to use as the avatar for the user
- `contact`: A React Query result containing contact information for the user,
  see useContact
- `...`: all other props supplied to the Avatar component

Use like this for example:

```js
<Avatar handle={userHandle} width={30} height={30} className={'avatarImage'} />
```

or this with a render prop:

```js
<Avatar
  handle={userHandle}
  render={(src, contact) => (
    <div className={"avatarComponent"}>
      <img src={src}/>
      {contact.data?.display_name}
    </div>
  }
/>
```

**Kind**: static constant of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Category**: components  
<a name="module_@tokenized/sdk-react-private.useTokenizedApi"></a>

### @tokenized/sdk-react-private.useTokenizedApi ⇒ [<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)

**`React hook`** providing access to the
[TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi) session manager.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi) -
The session manager you passed into
[`<TokenizedApiProvider>`](TokenizedApiProvider).  
**Category**: hooks  
<a name="module_@tokenized/sdk-react-private.useCurrentProfileName"></a>

### @tokenized/sdk-react-private.useCurrentProfileName ⇒ <code>string</code>

**`React hook`** The name of the user’s current profile. Display in an account
menu next to the user’s name. Currently the profile name will always be
“Individual”.

#### About profiles

The SDK interacts with a single current profile per session, providing
management of the vaults, assets, and contracts allowed by the user’s role
within the entity selected by the profile. _Currently only the user’s personal
“Individual” entity and its default profile is supported._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>string</code> - The current profile name  
**Category**: hooks/account  
<a name="module_@tokenized/sdk-react-private.useOwnFormattedName"></a>

### @tokenized/sdk-react-private.useOwnFormattedName ⇒ <code>string</code>

**`React hook`** The full name of the authenticated user. Display the user’s
name in an account menu, for example. The name is available as soon as the login
credentials are verified, so you can display it in the MFA prompt before full
authentication.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>string</code> - The user’s full name  
**Category**: hooks/account  
<a name="module_@tokenized/sdk-react-private.useActivity"></a>

### @tokenized/sdk-react-private.useActivity ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

**`React Query hook`** Filtered and sorted list of the activity of the default
profile of an account. While the hook is mounted, activity will be refreshed
automatically **every 60 seconds**.

See https://react-query.tanstack.com/guides/queries for general information
about using a React Query `UseQueryResults` object. Once loaded, the `data`
property will contain an array of objects, one for each activity event, each
containing:

- `activityEventType`: Object with `id` and `name` describing the type of the
  event
- `activityEventStatus`: Object with `id` and `name` describing the status of
  the event
- `txId`: Transaction Id
- `dateCreated`: Time of event (in milliseconds since Unix epoch)
- `vaultId`: Id of the vault fufilling this activity
- `memo`: String describing transaction (supplied by the trade initiating user)
- `contract`: Optional object describing the contract
  - `name`: Name given to contract
- `assets`: Array of assets related to event
  - `assetId`: ID of the asset
  - `assetName`: Display name of asset
  - `total`: Total `quantity` of authorized assets
  - `delta`: Change in `quantity` of authorized assets due to this activity
- `counterparties`: Array of parties to a transaction (eg, 2 in the case of a
  trade)
  - `displayName`: User's name
  - `displayHandle`: User's paymail handle
  - `transfers`: Array of transferred assets
    - `direction`: `sent` or `received`
    - `assetId`: ID of the asset transferred
    - `assetName`: Display name of the asset transferred
    - `quantity`: The transferred `quantity` – see below
- `fees`: Describes the network fees incurred by the event
  - `all`: The `quantity` of network fees paid by the current entity for this
    event

`activityEventType` can be:

- `payment`
- `trade_offer`
- `contract_formation`
- `contract_amendment`
- `contract_expire`
- `asset_creation`
- `asset_amendment`
- `asset_expire`
- `vault_creation_proposal`
- `vault_deletion_proposal`

`activityEventStatus` can be:

- `proposed_offer`: initial pending status for all activity events.
- `awaiting_acceptance`: the current profile owner needs to respond to a pending
  action.
- `awaiting_counterparty`: a response is being awaited from the counterparty.
- `awaiting_agent`: a smart contract agent is currently processing this event.
- `rejected`: rejected or declined by the counterparty.
- `expired`: pending activity event has expired.
- `failed`: response to an event did not meet the criteria of the request.
- `signed`: a signature request was sent with a signed transaction within.
- `executed`: final activity the event has concluded, no further actions are
  expected.

A quantity is an object containing:

- `tokens`: the quantity in the natural units of the asset, for non-currency
  assets – “48 coupons”.
  - `number`: Number of tokens transferred
  - `formatted`: Localized display string
- `assetCurrency`: the value transferred in the asset’s own currency, if
  specified – “$59,184.00”.
  - `number`: Currency value transferred
  - `NumberFormatOptions`: Object to be supplied to Intl.NumberFormat
- `displayCurrency`: the value transferred, converted to the user’s selected
  display currency – “£41,737.68”.
  - `number`: Currency value transferred
  - `NumberFormatOptions`: Object to be supplied to Intl.NumberFormat

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>UseQueryResult</code>](#external_react-query.UseQueryResult) - An array
of activity events as the `data` property within a React Query
[`UseQueryResult`](#external_react-query.UseQueryResult) object.  
**Category**: hooks/activity

| Param                                | Type                 | Description                                                                                                          |
| ------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| filters                              | <code>Object</code>  | Filters                                                                                                              |
| filters.includeIncompleteEvents      | <code>boolean</code> | Controls whether incomplete and invalid events are included. Default is `false`.                                     |
| filters.includeSuccessfulEvents      | <code>boolean</code> | Controls whether events that have completed successfully are included. Default is `true`.                            |
| filters.includeFailedEvents          | <code>boolean</code> | Controls whether events that have failed or beeen rejected are included. Default is `true`.                          |
| filters.includeExpiredEvents         | <code>boolean</code> | Controls whether events that have expired (like a trade offer) are included. Default is `true`.                      |
| filters.includeEventsRequiringAction | <code>boolean</code> | Controls whether events that are waiting for a response from the current entity are included. Default is `true`.     |
| filters.includeEventsPendingOthers   | <code>boolean</code> | Controls whether events that are pending the response of a counterparty or an agent are included. Default is `true`. |
| filters.includeEventsForAssetId      | <code>string</code>  | Set this to an assetId in order to include only events involving that asset. Default is `undefined`.                 |

<a name="module_@tokenized/sdk-react-private.useActivityEvent"></a>

### @tokenized/sdk-react-private.useActivityEvent ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

**`React Query hook`** Gets the details of a specific activity event. While the
hook is mounted, the activity event will be refreshed automatically **every 60
seconds**. Use this to show details for one specific user event.

See https://react-query.tanstack.com/guides/queries for general information
about using a React Query `UseQueryResults` object. Once loaded, the `data`
property will contain an object containing event details in the same format as
for [`useActivity`](#module_@tokenized/sdk-react-private.useActivity).

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>UseQueryResult</code>](#external_react-query.UseQueryResult) - An object
describing the event, as the `data` property within a React Query
[`UseQueryResult`](#external_react-query.UseQueryResult) object, or `null` if
the event can’t be found.  
**Category**: hooks/activity

| Param     | Type                | Description                     |
| --------- | ------------------- | ------------------------------- |
| eventTxId | <code>string</code> | The ID of the event to retrieve |

<a name="module_@tokenized/sdk-react-private.useContact"></a>

### @tokenized/sdk-react-private.useContact

**`React Query hook`** Contact information for a user's handle

See https://react-query.tanstack.com/guides/queries

Data object contains properties:

- `displayHandle`: Full-length paymail handle of the associated entity.
- `displayName`: Display name of the associated entity.
- `avatarURL`: Full URL to the entity's avatar image.

Will be refreshed automatically **every 60 seconds**.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Category**: hooks/contact

| Param  | Type                | Description   |
| ------ | ------------------- | ------------- |
| handle | <code>String</code> | User's handle |

<a name="module_@tokenized/sdk-react-private.useHandles"></a>

### @tokenized/sdk-react-private.useHandles

**`React Query hook`** Filtered list of paymail handles matching a search term

See https://react-query.tanstack.com/guides/queries

Each object in the data array describes a paymail handle:

- `displayHandle`: Full-length paymail handle of the associated entity.
- `displayName`: Display name of the associated entity.
- `isActive`: true if this handle is active or false if it has been deactivated
  and shouldn't be used.
- `avatarURL`: Full URL to the entity's avatar image.

Will be refreshed automatically **every 60 seconds**.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Category**: hooks/contact

| Param               | Type                 | Description                         |
| ------------------- | -------------------- | ----------------------------------- |
| search              | <code>String</code>  | Search text                         |
| filters             | <code>Object</code>  | Filters                             |
| filters.excludeSelf | <code>boolean</code> | Exclude logged in user from results |

<a name="module_@tokenized/sdk-react-private.useContracts"></a>

### @tokenized/sdk-react-private.useContracts ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

**`React hook`** Provides a list of the contracts accessible in the current
profile, including all those that the profile’s entity is a counterparty to, and
the contracts for all assets held by the entity. The list includes contracts
that can be edited and contracts that can only be viewed.

_The contract data structure is not finalized, and will be reorganized and
transformed for easier usage in a future SDK release._

**Kind**: static property of
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

**Category**: hooks/contracts  
<a name="module_@tokenized/sdk-react-private.useIsLoading"></a>

### @tokenized/sdk-react-private.useIsLoading ⇒ <code>boolean</code>

**`React hook`** Initial loading status. Show a loading screen when
`useIsLoading` is `true`.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - Remains `true` until the Tokenized SDK has
finished restoring the session on startup.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useIsLoggedIn"></a>

### @tokenized/sdk-react-private.useIsLoggedIn ⇒ <code>boolean</code>

**`React hook`** Valid user session status. Check this on every normal page of
your app, and switch to the login prompt if `useIsLoggedIn` is `false`.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when a user session is fully
authenticated and not expired, `false` during the log in process, and when
there’s no valid session.  
**Category**: hooks/login  
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

<a name="module_@tokenized/sdk-react-private.useIsLoggedOut"></a>

### @tokenized/sdk-react-private.useIsLoggedOut ⇒ <code>boolean</code>

**`React hook`** Current “no session” status.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when there’s no valid user session,
and also no log-in process happening.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useIsLoggingIn"></a>

### @tokenized/sdk-react-private.useIsLoggingIn ⇒ <code>boolean</code>

**`React hook`** Current log-in process status. Show a spinner and disable user
input on your log-in screen when `useIsLoggingIn` is `true`.

_Note that in an upcoming release of the SDK, log in will be handled by a
redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log-in process has started
(credentials entered), but the user has not been fully authenticated yet.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useIsWaitingForDevicePairing"></a>

### @tokenized/sdk-react-private.useIsWaitingForDevicePairing ⇒ <code>boolean</code>

**`React hook`** Signals that the SDK is waiting for authenticator device
pairing. Show the pairing QR code and a prompt to “Scan this code with the
authenticator app” on your login screen when `useIsWaitingForDevicePairing` is
`true`.

Note that `useIsWaitingForDevicePairing` can be `true` at the same time as
`useLogInNeedsMfa` is `true`. That occurs when there is an active authenticator
device already paired with the account, so MFA can proceed, but a device
re-pairing code has also been explicitly requested by calling
[`tokenizedApi.account.initiateDevicePairing`](module:@tokenized/sdk-js-private.TokenizedApi#account.initiateDevicePairing).
You should show the pairing QR code, but be prepared for MFA to complete without
it being used.

_Note that in an upcoming release of the SDK, device pairing will be handled by
a redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when a device pairing process is
active.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useLogInError"></a>

### @tokenized/sdk-react-private.useLogInError ⇒ <code>Error</code>

**`React hook`** Current log in error. Display the error message on your login
screen to inform the user why their log in attempt was unsuccessful.

_Note that in an upcoming release of the SDK, log in will be handled by a
redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>Error</code> - The error that caused a log in attempt to
fail. Cleared to `null` when a new log in process is started.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useLogInNeedsMfa"></a>

### @tokenized/sdk-react-private.useLogInNeedsMfa ⇒ <code>boolean</code>

**`React hook`** Signals that the log-in process is waiting for multi-factor
authentication. Show a prompt to “Confirm your identity in the authenticator
app” on your login screen when `useLogInNeedsMfa` is `true`.

_Note that in an upcoming release of the SDK, log in (including MFA) will be
handled by a redirect to a secure, Tokenized-hosted mini-web-app, and this hook
will no longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log in process is polling
for MFA confirmation.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useLogInNeedsRestoreRootKey"></a>

### @tokenized/sdk-react-private.useLogInNeedsRestoreRootKey ⇒ <code>boolean</code>

**`React hook`** Signals that the log-in process is paused waiting for account
restoration. Show a prompt to enter the seed phrase for recovery when
`useLogInNeedsRestoreRootKey` is `true`.

_Note that in an upcoming release of the SDK, account recovery will be handled
by a redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log in process has paused
for account restoration.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useLogInNeedsSeedPhraseBackup"></a>

### @tokenized/sdk-react-private.useLogInNeedsSeedPhraseBackup ⇒ <code>boolean</code>

**`React hook`** Signals that the log-in process is paused waiting for seed
phrase backup. Show the seed phrase, and confirm the user has correctly recorded
it when `useLogInNeedsSeedPhraseBackup` is `true`.

_Note that in an upcoming release of the SDK, seed phrase backup will be handled
by a redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log in process has paused
for seed phrase backup.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useLogInNeedsVerifyEmail"></a>

### @tokenized/sdk-react-private.useLogInNeedsVerifyEmail ⇒ <code>boolean</code>

**`React hook`** Signals that the log-in process is paused waiting for email
verification. Show a prompt to “Verify your account with the email code” on your
login screen when `useLogInNeedsVerifyEmail` is `true`.

_Note that in an upcoming release of the SDK, account verification will be
handled by a redirect to a secure, Tokenized-hosted mini-web-app, and this hook
will no longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>boolean</code> - `true` when the log-in process has paused
for email verification.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useLogInProgress"></a>

### @tokenized/sdk-react-private.useLogInProgress ⇒ <code>object</code>

**`React hook`** Provides indication of the current stage of the log-in process.
Use this to show a progress bar and/or status message on your log-in screen.

_Note that in an upcoming release of the SDK, log in will be handled by a
redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>object</code> - The progress through the log-in process
(`percent` property), and the stage reached (`checking` property).  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useResetPassphraseMaskedEmail"></a>

### @tokenized/sdk-react-private.useResetPassphraseMaskedEmail ⇒ <code>string</code>

**`React hook`** Masked email address that a passphrase reset confirmation email
was sent to. Display this after the user begins the recovery (forgot passphrase)
process, as part of the prompt to enter the confirmation code.

_Note that in an upcoming release of the SDK, seed passphrase reset will be
handled by a redirect to a secure, Tokenized-hosted mini-web-app, and this hook
will no longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>string</code> - The email address to display, with the middle
part masked with asterisks to prevent revealing sensitive information outside an
authenticated session.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useSeedPhraseWordsForBackup"></a>

### @tokenized/sdk-react-private.useSeedPhraseWordsForBackup ⇒ <code>Array.&lt;string&gt;</code>

**`React hook`** Provides the default root key seed phrase. Present this to the
user when the log-in process requests seed phrase backup, and ask them to write
it down and keep it safe.

Use the hook in a component that only gets mounted when the log-in process
requests a seed phrase backup. In other situations, every word in the returned
array will be `undefined`.

_Note that in an upcoming release of the SDK, seed phrase backup will be handled
by a redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of 24 English words
from which the root key is derived.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useVerificationEmailAddress"></a>

### @tokenized/sdk-react-private.useVerificationEmailAddress ⇒ <code>string</code>

**`React hook`** Provides the email address that a verification code was sent
to. Use this to prompt the user to retrieve the code and enter it to continue.

_Note that in an upcoming release of the SDK, verification codes will be handled
by a redirect to a secure, Tokenized-hosted mini-web-app, and this hook will no
longer be necessary._

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**: <code>string</code> - The email address that a verification code
was sent to.  
**Category**: hooks/login  
<a name="module_@tokenized/sdk-react-private.useConfirmSendAsset"></a>

### @tokenized/sdk-react-private.useConfirmSendAsset

**`React Query mutation hook`** Prepare a transaction for sending an asset

See documentation for usePrepareSendAsset

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Category**: hooks/transfer  
<a name="module_@tokenized/sdk-react-private.usePrepareSendAsset"></a>

### @tokenized/sdk-react-private.usePrepareSendAsset

**`React Query mutation hook`** Prepare a transaction for sending an asset

See https://react-query.tanstack.com/guides/mutations

The mutation has parameters:

- `vaultId`: The id of the sending vault
- `assetId`: The id of the asset to send
- `description`: An optional free text description (memo) to be sent with the
  transaction
- `recipients`: A list of recipients, each of which is an object, either amount
  or sendMax are required:
  - `amount`: number - optional amount of asset, for example 1 for 1 BSV or for
    $1
  - `sendMax`: boolean - optionally to indicate sending maximum possible
    quantity
  - `handle`: Send to this paymail address. Only Tokenized entities supported
    for non-BSV transfers

Resolves to an object containing the supplied parameters and also the fee:

- `fee`: Quantity, see above, describing computed fee in BSV

The resolved object can be passed to the useConfirmSendAsset mutation to
complete the transfer.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Category**: hooks/transfer  
<a name="module_@tokenized/sdk-react-private.useSendMaxEstimate"></a>

### @tokenized/sdk-react-private.useSendMaxEstimate

**`React Query hook`** Filtered list of paymail handles matching a search term

See https://react-query.tanstack.com/guides/queries

Each object in the data array describes a paymail handle:

- `displayHandle`: Full-length paymail handle of the associated entity.
- `displayName`: Display name of the associated entity.
- `isActive`: true if this handle is active or false if it has been deactivated
  and shouldn't be used.
- `avatarURL`: Full URL to the entity's avatar image.

Will be refreshed automatically **every 60 seconds**.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Category**: hooks/transfer

| Param               | Type                 | Description                         |
| ------------------- | -------------------- | ----------------------------------- |
| search              | <code>String</code>  | Search text                         |
| filters             | <code>Object</code>  | Filters                             |
| filters.excludeSelf | <code>boolean</code> | Exclude logged in user from results |

<a name="module_@tokenized/sdk-react-private.useFilteredBalances"></a>

### @tokenized/sdk-react-private.useFilteredBalances ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

**`React Query hook`** Filtered and sorted list of the quantities (balances) of
assets and liabilities in a specified vault. While the hook is mounted, balances
will be refreshed automatically **every 60 seconds**.

See https://react-query.tanstack.com/guides/queries for general information
about using a React Query `UseQueryResults` object. Once loaded, the `data`
property will contain an array of objects, one for each asset balance. Each
object describes a selection of relevant quantities for the particular asset:

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

For the currency quantitiesimport `NumberFormatOptions` objects are provided
that can be passed directly (or with your own modifications) to
[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)
for localized currency formatting.

**Kind**: static property of
[<code>@tokenized/sdk-react-private</code>](#module_@tokenized/sdk-react-private)  
**Returns**:
[<code>UseQueryResult</code>](#external_react-query.UseQueryResult) - An array
of balances as the `data` property within a React Query
[`UseQueryResult`](#external_react-query.UseQueryResult) object. Refer to the
example for details of the data structure and how to use it.  
**Category**: hooks/treasury

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

<a name="module_@tokenized/sdk-react-private.usePrimaryVault"></a>

### @tokenized/sdk-react-private.usePrimaryVault ⇒ [<code>UseQueryResult</code>](#external_react-query.UseQueryResult)

**`React hook`** Provides information about the primary vault in the user’s
current profile. Pass the `id` of the vault into
[`useFilteredBalances`](#module_@tokenized/sdk-react-private.useFilteredBalances)
to get a list of the assets in the vault.

_Currently only a single primary vault is supported per profile._

**Kind**: static property of
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

**Category**: hooks/treasury  
<a name="module_@tokenized/sdk-js-private"></a>

## @tokenized/sdk-js-private

Tokenized JavaScript SDK, cached queries and mutations (excludes bindings to
specific UI libraries)

- [@tokenized/sdk-js-private](#module_@tokenized/sdk-js-private)
  - [.TokenizedApi](#module_@tokenized/sdk-js-private.TokenizedApi)
    - [new TokenizedApi(config)](#new_module_@tokenized/sdk-js-private.TokenizedApi_new)
    - [.account](#module_@tokenized/sdk-js-private.TokenizedApi+account)
      - [.PASSPHRASE_MIN_LENGTH](#module_@tokenized/sdk-js-private.TokenizedApi+account+PASSPHRASE_MIN_LENGTH)
      - [.analyzePassphraseStrength](#module_@tokenized/sdk-js-private.TokenizedApi+account+analyzePassphraseStrength)
        ⇒ <code>object</code>
      - [.makeDebouncedHandleAvailabilityChecker()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedHandleAvailabilityChecker)
        ⇒ <code>function</code>
      - [.makeDebouncedEmailAvailabilityChecker()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedEmailAvailabilityChecker)
        ⇒ <code>function</code>
      - [.makeDebouncedRecoveryPhraseValidator()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedRecoveryPhraseValidator)
        ⇒ <code>function</code>
      - [.createNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+createNewAccount)
      - [.logIn(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+logIn)
        ⇒ <code>undefined</code> \| <code>boolean</code>
      - [.verifyNewAccount(code)](#module_@tokenized/sdk-js-private.TokenizedApi+account+verifyNewAccount)
      - [.getSeedPhraseWordsForBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getSeedPhraseWordsForBackup)
        ⇒ <code>Array.&lt;string&gt;</code>
      - [.autocompleteSeedWord(inputValue)](#module_@tokenized/sdk-js-private.TokenizedApi+account+autocompleteSeedWord)
        ⇒ <code>Array.&lt;string&gt;</code>
      - [.skipSeedPhraseBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+skipSeedPhraseBackup)
      - [.confirmSeedPhraseBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+confirmSeedPhraseBackup)
      - [.skipRestoreRootKey()](#module_@tokenized/sdk-js-private.TokenizedApi+account+skipRestoreRootKey)
      - [.restoreRootKey(words)](#module_@tokenized/sdk-js-private.TokenizedApi+account+restoreRootKey)
      - [.requestPassphraseReset(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+requestPassphraseReset)
        ⇒ <code>string</code>
      - [.resetPassphrase(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+resetPassphrase)
      - [.initiateDevicePairing()](#module_@tokenized/sdk-js-private.TokenizedApi+account+initiateDevicePairing)
      - [.logOut()](#module_@tokenized/sdk-js-private.TokenizedApi+account+logOut)
      - [.getUserHandlePostfix()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getUserHandlePostfix)
        ⇒ <code>string</code>
    - [.treasury](#module_@tokenized/sdk-js-private.TokenizedApi+treasury)
    - [.contracts](#module_@tokenized/sdk-js-private.TokenizedApi+contracts)
    - [.activity](#module_@tokenized/sdk-js-private.TokenizedApi+activity)
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
  - [.account](#module_@tokenized/sdk-js-private.TokenizedApi+account)
    - [.PASSPHRASE_MIN_LENGTH](#module_@tokenized/sdk-js-private.TokenizedApi+account+PASSPHRASE_MIN_LENGTH)
    - [.analyzePassphraseStrength](#module_@tokenized/sdk-js-private.TokenizedApi+account+analyzePassphraseStrength)
      ⇒ <code>object</code>
    - [.makeDebouncedHandleAvailabilityChecker()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedHandleAvailabilityChecker)
      ⇒ <code>function</code>
    - [.makeDebouncedEmailAvailabilityChecker()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedEmailAvailabilityChecker)
      ⇒ <code>function</code>
    - [.makeDebouncedRecoveryPhraseValidator()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedRecoveryPhraseValidator)
      ⇒ <code>function</code>
    - [.createNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+createNewAccount)
    - [.logIn(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+logIn)
      ⇒ <code>undefined</code> \| <code>boolean</code>
    - [.verifyNewAccount(code)](#module_@tokenized/sdk-js-private.TokenizedApi+account+verifyNewAccount)
    - [.getSeedPhraseWordsForBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getSeedPhraseWordsForBackup)
      ⇒ <code>Array.&lt;string&gt;</code>
    - [.autocompleteSeedWord(inputValue)](#module_@tokenized/sdk-js-private.TokenizedApi+account+autocompleteSeedWord)
      ⇒ <code>Array.&lt;string&gt;</code>
    - [.skipSeedPhraseBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+skipSeedPhraseBackup)
    - [.confirmSeedPhraseBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+confirmSeedPhraseBackup)
    - [.skipRestoreRootKey()](#module_@tokenized/sdk-js-private.TokenizedApi+account+skipRestoreRootKey)
    - [.restoreRootKey(words)](#module_@tokenized/sdk-js-private.TokenizedApi+account+restoreRootKey)
    - [.requestPassphraseReset(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+requestPassphraseReset)
      ⇒ <code>string</code>
    - [.resetPassphrase(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+resetPassphrase)
    - [.initiateDevicePairing()](#module_@tokenized/sdk-js-private.TokenizedApi+account+initiateDevicePairing)
    - [.logOut()](#module_@tokenized/sdk-js-private.TokenizedApi+account+logOut)
    - [.getUserHandlePostfix()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getUserHandlePostfix)
      ⇒ <code>string</code>
  - [.treasury](#module_@tokenized/sdk-js-private.TokenizedApi+treasury)
  - [.contracts](#module_@tokenized/sdk-js-private.TokenizedApi+contracts)
  - [.activity](#module_@tokenized/sdk-js-private.TokenizedApi+activity)
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
| config.onLogOut                   | <code>function</code>                      | Provide a function that will be called whenever the user is logged out. Use this to clear any sensitive user information you’ve cached in your app. The function is called with no arguments.                                                                                                   |

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

**Kind**: instance property of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)

- [.account](#module_@tokenized/sdk-js-private.TokenizedApi+account)
  - [.PASSPHRASE_MIN_LENGTH](#module_@tokenized/sdk-js-private.TokenizedApi+account+PASSPHRASE_MIN_LENGTH)
  - [.analyzePassphraseStrength](#module_@tokenized/sdk-js-private.TokenizedApi+account+analyzePassphraseStrength)
    ⇒ <code>object</code>
  - [.makeDebouncedHandleAvailabilityChecker()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedHandleAvailabilityChecker)
    ⇒ <code>function</code>
  - [.makeDebouncedEmailAvailabilityChecker()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedEmailAvailabilityChecker)
    ⇒ <code>function</code>
  - [.makeDebouncedRecoveryPhraseValidator()](#module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedRecoveryPhraseValidator)
    ⇒ <code>function</code>
  - [.createNewAccount(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+createNewAccount)
  - [.logIn(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+logIn)
    ⇒ <code>undefined</code> \| <code>boolean</code>
  - [.verifyNewAccount(code)](#module_@tokenized/sdk-js-private.TokenizedApi+account+verifyNewAccount)
  - [.getSeedPhraseWordsForBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getSeedPhraseWordsForBackup)
    ⇒ <code>Array.&lt;string&gt;</code>
  - [.autocompleteSeedWord(inputValue)](#module_@tokenized/sdk-js-private.TokenizedApi+account+autocompleteSeedWord)
    ⇒ <code>Array.&lt;string&gt;</code>
  - [.skipSeedPhraseBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+skipSeedPhraseBackup)
  - [.confirmSeedPhraseBackup()](#module_@tokenized/sdk-js-private.TokenizedApi+account+confirmSeedPhraseBackup)
  - [.skipRestoreRootKey()](#module_@tokenized/sdk-js-private.TokenizedApi+account+skipRestoreRootKey)
  - [.restoreRootKey(words)](#module_@tokenized/sdk-js-private.TokenizedApi+account+restoreRootKey)
  - [.requestPassphraseReset(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+requestPassphraseReset)
    ⇒ <code>string</code>
  - [.resetPassphrase(options)](#module_@tokenized/sdk-js-private.TokenizedApi+account+resetPassphrase)
  - [.initiateDevicePairing()](#module_@tokenized/sdk-js-private.TokenizedApi+account+initiateDevicePairing)
  - [.logOut()](#module_@tokenized/sdk-js-private.TokenizedApi+account+logOut)
  - [.getUserHandlePostfix()](#module_@tokenized/sdk-js-private.TokenizedApi+account+getUserHandlePostfix)
    ⇒ <code>string</code>

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+PASSPHRASE_MIN_LENGTH"></a>

##### account.PASSPHRASE_MIN_LENGTH

The minimum length of passphrase that will be accepted to secure an account

**Kind**: instance property of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+analyzePassphraseStrength"></a>

##### account.analyzePassphraseStrength ⇒ <code>object</code>

Assess the strength of a passphrase entered by the user, providing feedback and
suggestions for improvement. Use this in your “create account” and “change
passphrase” dialogs. The `isAcceptable` property in the result object specifies
whether or not this password will be accepted by
[`createNewAccount`](module:@tokenized/sdk-js-private.TokenizedApi#account.createNewAccount).

The core analysis is performed by the [`zxcvbn`](#external_zxcvbn) package, with
some additional formatting (including localization) and feedback specific to the
Tokenized service added to the result.

**Kind**: instance property of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)

| Param      | Type                              | Description                                                                                                                                                                                                               |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| passphrase | <code>string</code>               | The user-supplied passphrase to check                                                                                                                                                                                     |
| userInputs | <code>Array.&lt;string&gt;</code> | An optional list of strings that should be considered weak for the analysis. Use this to pass in the account identification (first and last names, email, handle), so that repeating those as the passphrase is rejected. |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedHandleAvailabilityChecker"></a>

##### account.makeDebouncedHandleAvailabilityChecker() ⇒ <code>function</code>

Use this in a new account dialog, to show the user as they type whether their
paymail unique ID (handle) is already in use. You can call the returned async
function as often as you like (on every keystroke), and it won’t send more than
one query to the back end every 500ms. Each time a query is sent, the result
will become the resolved value of all unresolved promises previously returned.

Note that each validator function returned by this method maintains its own
separate timer for debouncing, so if you call
`makeDebouncedHandleAvailabilityChecker` in a React render function, you must
memoize the result with `useMemo` or similar, to maintain the same validator for
the lifetime of your component.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
**Returns**: <code>function</code> - The async validation function, which takes
one argument, the handle string to check, and returns a promise that resolves to
`true` if the _most recent_ handle that was checked is available (because the
queries are debounced, only the last of a rapid sequence of submitted strings
will actually be checked).  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedEmailAvailabilityChecker"></a>

##### account.makeDebouncedEmailAvailabilityChecker() ⇒ <code>function</code>

Use this in a new account dialog, to show the user as they type whether an email
address is already associated with another account. You can call the returned
async function as often as you like (on every keystroke), and it won’t send more
than one query to the back end every 500ms. Each time a query is sent, the
result will become the resolved value of all unresolved promises previously
returned.

Note that each validator function returned by this method maintains its own
separate timer for debouncing, so if you call
`makeDebouncedEmailAvailabilityChecker` in a React render function, you must
memoize the result with `useMemo` or similar, to maintain the same validator for
the lifetime of your component.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
**Returns**: <code>function</code> - The async validation function, which takes
one argument, the email address to check, and returns a promise that resolves to
`true` if the _most recent_ email that was checked is available (because the
queries are debounced, only the last of a rapid sequence of submitted strings
will actually be checked).  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+makeDebouncedRecoveryPhraseValidator"></a>

##### account.makeDebouncedRecoveryPhraseValidator() ⇒ <code>function</code>

Use this during account recovery when prompting the user to enter their recovery
seed phrase, to feed back as they type whether they’ve got the words correct
(they’re checked against the primary vault’s public key). You can call the
returned async function as often as you like (on every keystroke), and it won’t
do the calculation (which is expensive) more than once every 500ms. Each time a
check is done, the result will become the resolved value of all unresolved
promises previously returned.

Note that each validator function returned by this method maintains its own
separate timer for debouncing, so if you call
`makeDebouncedEmailAvailabilityChecker` in a React render function, you must
memoize the result with `useMemo` or similar, to maintain the same validator for
the lifetime of your component.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
**Returns**: <code>function</code> - The async validation function, which takes
one argument, the 24 words of the seed phrase as an array of strings, and
returns a promise that resolves to `undefined` if the _most recent_ phrase that
was checked is correct (because the calls are debounced, only the last of a
rapid sequence of phrases will actually be checked). If the phrase is incorrect,
the promise will resolve to a localized string describing the error.  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+createNewAccount"></a>

##### account.createNewAccount(options)

Create a new account, and send a verification code to the specified email
address, The code will need to be provided during the first log-in to complete
the creation process. On success, this function starts a new log-in process
automatically with the account credentials.

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

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+logIn"></a>

##### account.logIn(options) ⇒ <code>undefined</code> \| <code>boolean</code>

Begin a new asynchronous log in process with the specified account credentials.
If a log in attempt is currently in progress, it will be cancelled and replaced
with the new one. Fails if there’s already a valid authenticated session.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
**Returns**: <code>undefined</code> \| <code>boolean</code> - A `Promise` that
resolves to one of three possible values:

- `undefined` – indicates the log-in process was cancelled by a later log-in
  request.
- `false` – indicates the log-in process is paused waiting for a user
  interaction, for example email verification.
- `true` – indicates log in completed successfully.

| Param               | Type                | Description                                                                                                                                                                                                                                                                                                                 |
| ------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options             | <code>object</code> |                                                                                                                                                                                                                                                                                                                             |
| options.handle      | <code>string</code> | Joined with the [user handle postfix](module:@tokenized/sdk-js-private.TokenizedApi#account.getUserHandlePostfix) to identify the account. So for example specifying `handle: 'hankrearden'` will log in as `hankrearden@tokenized.id` on the production back end. Specify only one of `handle`, `phoneNumber`, or `email`. |
| options.phoneNumber | <code>string</code> | Identifies the account to log into using the phone number registered to the account. Specify only one of `handle`, `phoneNumber`, or `email`.                                                                                                                                                                               |
| options.email       | <code>string</code> | Identifies the account to log into using the email address registered to the account. Specify only one of `handle`, `phoneNumber`, or `email`.                                                                                                                                                                              |
| options.passphrase  | <code>string</code> | The passphrase to authenticate the user’s account.                                                                                                                                                                                                                                                                          |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+verifyNewAccount"></a>

##### account.verifyNewAccount(code)

Verify creation of a new account during initial log in by providing the code
sent to the account email address (triggered by an earlier call to
[`createNewAccount`](module:@tokenized/sdk-js-private.TokenizedApi#account.createNewAccount)).
If the code is correct, the log in process will continue automatically.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)

| Param | Type                | Description                                    |
| ----- | ------------------- | ---------------------------------------------- |
| code  | <code>string</code> | The verification code from the received email. |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+getSeedPhraseWordsForBackup"></a>

##### account.getSeedPhraseWordsForBackup() ⇒ <code>Array.&lt;string&gt;</code>

Provides the default root key seed phrase. Present this to the user when the
log-in process requests seed phrase backup, and ask them to write it down and
keep it safe.

Note that for security reasons, the actual words are only provided when a seed
phrase backup is needed – at other times every item in the array will be
`undefined`.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of 24 English words
from which the root key is derived.  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+autocompleteSeedWord"></a>

##### account.autocompleteSeedWord(inputValue) ⇒ <code>Array.&lt;string&gt;</code>

Provides a sorted list of possible seed phrase words that best match user input.
Use this in your account recovery dialog to provide autocomplete assistance to
the user when they’re entering their 24-word seed phrase.

Note that this function has to search the complete list of about two thousand
seed words, so you should ensure it’s only called when really needed – don’t
call it unconditionally in the render function for every seed word.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of seed phrase words
that roughly match what the user typed, ordered by best match first.

| Param      | Type                | Description                                     |
| ---------- | ------------------- | ----------------------------------------------- |
| inputValue | <code>string</code> | A partially-complete recovery seed phrase word. |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+skipSeedPhraseBackup"></a>

##### account.skipSeedPhraseBackup()

When trying to log in to an account where the user hasn’t yet recorded the seed
phrase, you can call this to skip the backup and start the session. You should
warn the user that this is a dangerous action that might lead to loss of the
account.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+confirmSeedPhraseBackup"></a>

##### account.confirmSeedPhraseBackup()

Confirms that the user has recorded their seed phrase, and sets `isBackedUp` to
`true` in the `userDetails` query. Before you call this, you should check the
user is able to re-enter the seed phrase correctly. The log in process will
continue automatically after the returned promise resolves.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+skipRestoreRootKey"></a>

##### account.skipRestoreRootKey()

When trying to log in to an account that needs recovery due to an invalid root
key, you can call this to skip the restore and start the session anyway. You
should warn the user that all transactions will fail in this state.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+restoreRootKey"></a>

##### account.restoreRootKey(words)

Restores the user’s default root key using the entered backup seed phrase, which
is checked first to make sure it matches the registered vault public key. The
log-in process will continue automatically after the returned promise resolves.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)

| Param | Type                              | Description                                        |
| ----- | --------------------------------- | -------------------------------------------------- |
| words | <code>Array.&lt;string&gt;</code> | The 24-word recovery phrase as an array of strings |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+requestPassphraseReset"></a>

##### account.requestPassphraseReset(options) ⇒ <code>string</code>

Use this to implement a “forgot passphrase” flow in your sign in dialog. Call
this method, identifying the account using one of a handle, email address, or
phone number as for
[`logIn`](module:@tokenized/sdk-js-private.TokenizedApi#account.logIn), If the
account is recognized, the back end will send a confirmation code to the
registered email address (which is provided in obfuscated form to display in a
prompt). Call
[`resetPassphrase`](module:@tokenized/sdk-js-private.TokenizedApi#account.resetPassphrase)
with the entered confirmation code and new passphrase to complete the process.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
**Returns**: <code>string</code> - (In a `Promise`) the email address that the
confirmation code was sent to, partly masked for privacy. In React apps it’s
more convenient to retrieve this via the dedicated hook
[`useResetPassphraseMaskedEmail`](#module_@tokenized/sdk-react-private.useResetPassphraseMaskedEmail).

| Param               | Type                | Description                                                                                                                                                                                                                                                                                                             |
| ------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options             | <code>object</code> |                                                                                                                                                                                                                                                                                                                         |
| options.handle      | <code>string</code> | Joined with the [user handle postfix](module:@tokenized/sdk-js-private.TokenizedApi#account.getUserHandlePostfix) to identify the account. So for example specifying `handle: 'hankrearden'` will reset `hankrearden@tokenized.id` on the production back end. Specify only one of `handle`, `phoneNumber`, or `email`. |
| options.email       | <code>string</code> | Identifies the account to reset using the email address registered to the account. Specify only one of `handle`, `phoneNumber`, or `email`.                                                                                                                                                                             |
| options.phoneNumber | <code>string</code> | Identifies the account to reset using the phone number registered to the account. Specify only one of `handle`, `phoneNumber`, or `email`.                                                                                                                                                                              |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+resetPassphrase"></a>

##### account.resetPassphrase(options)

Use this to set a new passphrase for an account when the user has forgotten
their passphrase. After first calling
[`requestPassphraseReset`](module:@tokenized/sdk-js-private.TokenizedApi#account.requestPassphraseReset),
prompt the user to enter the confirmation code, and create a new passphrase. On
success, the method modifies the passphrase, and automatically starts a log-in
process to the account. Unless the user re-entered their old passphrase, the
root key will now be unusable, and the log-in process will request the recovery
seed phrase to restore it.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)

| Param                     | Type                | Description                                    |
| ------------------------- | ------------------- | ---------------------------------------------- |
| options                   | <code>object</code> |                                                |
| options.code              | <code>string</code> | The confirmation code from the received email. |
| options.passphrase        | <code>string</code> | The new passphrase for the account.            |
| options.passphraseConfirm | <code>string</code> | The new passphrase for the account.            |

<a name="module_@tokenized/sdk-js-private.TokenizedApi+account+initiateDevicePairing"></a>

##### account.initiateDevicePairing()

Generate a new one-time password to start the device pairing process. During
sign in, this will be done automatically if the user has no active authenticator
devices. Use this function when the user explicitly chooses to re-pair, or if
you need to regenerate an expired code.

**Kind**: instance method of
[<code>account</code>](#module_@tokenized/sdk-js-private.TokenizedApi+account)  
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
<a name="module_@tokenized/sdk-js-private.TokenizedApi+activity"></a>

#### tokenizedApi.activity

Access to activity

**Kind**: instance property of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="module_@tokenized/sdk-js-private.TokenizedApi+getQueryClient"></a>

#### tokenizedApi.getQueryClient() ⇒ [<code>QueryClient</code>](#external_react-query.QueryClient)

Provides the
[React Query `QueryClient` object](https://react-query.tanstack.com/reference/QueryClient)
that manages the API data cache for the current user session. Use to observe
query data and perform mutations.

**Kind**: instance method of
[<code>TokenizedApi</code>](#module_@tokenized/sdk-js-private.TokenizedApi)  
<a name="external_zxcvbn"></a>

## zxcvbn

A password strength estimator that identifies the patterns used in common weak
passwords exploited by password crackers. Note that `zxcvbn` includes a
significant amount of static string data, and so installing
`@tokenized/sdk-js-private` can increase your Webpack bundle size by several
hundred kilobytes.

**Kind**: global external  
**See**: https://github.com/dropbox/zxcvbn#usage  
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

- **`0.5.5` 2021-07-20**
  - The SDK now supports sending of assets
  - When pairing devices it is no longer necessary to select the backend as this
    is encoded in the QR code
- **`0.5.4` 2021-07-06**
  - Adds the ability to configure the SDK (via property `onLogOut`) with a
    function that gets called on log out, so that sensitive state can be
    cleared.
- **`0.5.3` 2021-07-03**
  - Querying and formatting of the user's activity
- **`0.5.2` 2021-06-27** – Fixes a bug preventing the “Show pairing code” button
  from working on the sign-in MFA prompt.
- **`0.5.1` 2021-06-25** – Adds SDK support, and UI in the example app, to
  handle new account creation, passphrase reset, recovery phrase backup, and
  account restoration from the recovery phrase.
- **`0.5.0` 2021-06-25** – This release was incorrectly built and should not be
  used.
- **`0.4.0` 2021-05-31** — First customer preview release. Full documentation of
  the library interfaces is now built into the READMEs.
- **`0.3.0` 2021-05-24** — Fully-functional querying and formatting of treasury
  balance lists, and initial support for listing contracts, using React Query
  for data fetching. Internationalization support with React Intl (FormatJS).
- **`0.2.0` 2021-05-11** — Some bug fixes and tidy-up.
- **`0.1.0` 2021-05-10** — Initial version published. Functional log in process
  including MFA.
