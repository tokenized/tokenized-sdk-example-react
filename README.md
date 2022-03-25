# Tokenized JavaScript SDK example app

[Tokenized](https://tokenized.com) is a platform for issuing, managing and
trading digital instruments. The platform is built on the open source
[Tokenized Protocol](https://tokenized.com/docs/intro/preface), which specifies
how smart legal contracts and financial interactions are represented on the
blockchain. Tokenized provides a first-party app for managing contracts and
instruments, and provides the same capabilities in customers’ own financial apps
through a [fully-documented REST API](https://docs.api.tokenized.com). For
customers building web-based apps, the
[Tokenized JavaScript SDK](https://www.npmjs.com/package/@tokenized/sdk-react-private)
handles all the details of the REST API for you, and is the quickest way to
integrate the power of the Tokenized platform.

_This is **SDK release 0.6.1**, an early-access preview release with many
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

# Release notes

The SDK is always released together in three parts:
[`@tokenized/sdk-js-private` (NPM package)](https://www.npmjs.com/package/@tokenized/sdk-js-private),
[`@tokenized/sdk-react-private` (NPM package)](https://www.npmjs.com/package/@tokenized/sdk-js-private),
and
[`tokenized/tokenized-sdk-example-react` (GitHub repo)](https://github.com/tokenized/tokenized-sdk-example-react).

- **`0.6.1` 2021-08-24**
  - Major update to the formatting of activity lists, making it easier to
    separate events clearly into historical, actionable, and pending items, and
    sharing the same implementation as the next update to the Tokenized desktop
    app. See the updated example app activity page for more details of the
    improved query data.
  - Support for updating activity lists immediately in response to new activity
    pushed by the server, without needing any additional code in your
    application.
  - Some improvements to the “Send assets” dialog in the example app.
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
