# DEPRECATED: Tokenized JavaScript SDK example app

[Tokenized](https://tokenized.com) is a platform for issuing, managing and
trading digital instruments. The platform is built on the open source
[Tokenized Protocol](https://tokenized.com/#/protocol/docs/), which specifies
how smart legal contracts and financial interactions are represented on the
blockchain. Tokenized provides a first-party app for managing contracts and
instruments, and offers the same capabilities for integration into customers’
own financial apps through a
[JavaScript SDK](https://docs.api.tokenized.com/sdk/0.8.0/react/index.html) and
[REST API](https://docs.api.tokenized.com).

This GitHub repository is an archive of a web app built to demonstrate early
beta versions of the Tokenized JavaScript SDK. As of version 0.8.0 the example
app is no longer being maintained. After our product launch in 2023, we plan to
publicly release an updated **Tokenized Platform Integration Kit** to support
developers building Tokenized-powered apps, containing the production SDK, and
the full source code for the Tokenized Desktop Wallet demonstrating how to use
it.

---

# Archived release notes

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
