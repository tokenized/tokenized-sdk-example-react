# Tokenized JavaScript SDK example app

This is a fully functional [Tokenized-powered](https://tokenized.com) web app
built to demonstrate, as clearly as possible, how to use all the features of the
[Tokenized JavaScript SDK](https://www.npmjs.com/package/@tokenized/sdk-react-private).

_This is SDK release **0.3.0**_

## Goals

- To make use of the same popular React ecosystem tools you would likely choose
  if you were building a real app.
- To follow the latest best practices in app development.
- To provide uncomplicated code that you can easily paste into your own app to
  get going quickly.

## Technologies used

- The
  [Tokenized JavaScript SDK](https://www.npmjs.com/package/@tokenized/sdk-react-private)
  React bindings to a cached model-layer wrapping the
  [Tokenized REST API](https://docs.api.tokenized.com).
- [Create React App](https://github.com/facebook/create-react-app) provides a
  standard [React](https://reactjs.org) application build setup with
  [Webpack](https://webpack.js.org) and [Babel](https://babeljs.io).
- [React Router](https://reactrouter.com) manages page navigation and the app’s
  URL structure.
- [Redux Toolkit](https://redux-toolkit.js.org/) is used for some minimal
  application state, to demonstrate co-existence with the SDK’s own Redux store.
- [Format.JS (react-intl)](https://formatjs.io/docs/react-intl) handles all text
  formatting via message resources (only English strings are currently
  available).
- The [Bulma CSS framework](https://bulma.io/documentation/) is used directly
  with plain JSX (no component library), and custom styling is avoided – just
  the classes provided by the framework.
- [Font Awesome 5 (free)](https://fontawesome.com/v5.15/icons?d=gallery&p=1&m=free)
  provides the icons.

## Running the app

Clone the repository and install the dependencies:

    git clone git@github.com:tokenized/tokenized-sdk-example-react.git
    cd tokenized-sdk-example-react
    npm install

To run the app in development mode:

    npm start

If Webpack doesn’t open the app in your browser automatically, browse to
[http://localhost:3000](http://localhost:3000). Any changes you save to the code
will be updated live.

## Bundling the app

To build an optimized and bundled app for deployment, in the `build` folder:

    npm run build

---

# Tokenized SDK documentation

{{>main}}

---

# Release notes

The SDK is always released together in three parts:
[`@tokenized/sdk-js-private` (NPM package)](https://www.npmjs.com/package/@tokenized/sdk-js-private),
[`@tokenized/sdk-react-private` (NPM package)](https://www.npmjs.com/package/@tokenized/sdk-js-private),
and
[`tokenized/tokenized-sdk-example-react` (GitHub repo)](https://github.com/tokenized/tokenized-sdk-example-react).

- **`0.3.0` 2021-05-24** — Fully-functional fetching and formatting of treasury
  balance lists, and initial support for listing contracts, using React Query
  for data fetching. Internationalization support with Format.JS (React Intl).
- **`0.2.0` 2021-05-11** — Some bug fixes and tidy-up.
- **`0.1.0` 2021-05-10** — Initial version published. Functional log in process
  including MFA.
