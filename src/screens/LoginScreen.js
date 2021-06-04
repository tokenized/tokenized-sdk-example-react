import React, { useState, useCallback } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  useIsLoading,
  useIsLoggingIn,
  useLogInNeedsMfa,
  useIsWaitingForDevicePairing,
  DevicePairingCode,
  useIsLoggedIn,
  useLogInError,
  useOwnFormattedName,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';

function LoginScreen() {
  const location = useLocation();
  const tokenizedApi = useTokenizedApi();
  const isLoading = useIsLoading();
  const isLoggingIn = useIsLoggingIn();
  const needsMfa = useLogInNeedsMfa();
  const showPairingCode = useIsWaitingForDevicePairing();
  const isLoggedIn = useIsLoggedIn();
  const ownFormattedName = useOwnFormattedName();

  const [identifierType, setIdentifierType] = useState('handle');
  const onSelectHandleId = useCallback((event) => {
    event.preventDefault();
    setIdentifierType('handle');
  }, []);
  const onSelectEmailId = useCallback((event) => {
    event.preventDefault();
    setIdentifierType('email');
  }, []);
  const onSelectPhoneId = useCallback((event) => {
    event.preventDefault();
    setIdentifierType('phone');
  }, []);

  const [handle, setHandle] = useState('');
  const onHandleInput = useCallback(
    (event) => setHandle(event.target.value),
    [setHandle],
  );
  const handlePostfix = tokenizedApi.account.getUserHandlePostfix();

  const [email, setEmail] = useState('');
  const onEmailInput = useCallback(
    (event) => setEmail(event.target.value),
    [setEmail],
  );

  const [phoneNumber, setPhoneNumber] = useState('');
  const onPhoneNumberInput = useCallback(
    (event) => setPhoneNumber(event.target.value),
    [setPhoneNumber],
  );

  const [passphrase, setPassphrase] = useState('');
  const onPassphraseInput = useCallback(
    (event) => setPassphrase(event.target.value),
    [setPassphrase],
  );

  let signInButtonEnabled = false;
  switch (identifierType) {
    case 'handle':
    default:
      signInButtonEnabled = handle && passphrase;
      break;
    case 'email':
      signInButtonEnabled = email && passphrase;
      break;
    case 'phone':
      signInButtonEnabled = phoneNumber && passphrase;
      break;
  }
  const onSignIn = useCallback(
    (event) => {
      event.preventDefault();
      switch (identifierType) {
        case 'handle':
        default:
          tokenizedApi.account.logIn({ handle, passphrase });
          break;
        case 'email':
          tokenizedApi.account.logIn({ email, passphrase });
          break;
        case 'phone':
          tokenizedApi.account.logIn({ phoneNumber, passphrase });
          break;
      }
      setHandle('');
      setEmail('');
      setPhoneNumber('');
      setPassphrase('');
    },
    [
      email,
      handle,
      identifierType,
      passphrase,
      phoneNumber,
      tokenizedApi.account,
    ],
  );

  const onCancelSignIn = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);
  const onDisplayPairingCode = useCallback(() => {
    tokenizedApi.account.initiateDevicePairing();
  }, [tokenizedApi]);

  const logInError = useLogInError();
  const [hideError, setHideError] = useState(null);
  const onDismissError = useCallback(
    () => setHideError(logInError),
    [logInError],
  );

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isLoggedIn) {
    let originalLocation = '/';
    if (
      location?.state?.from &&
      location?.state?.from?.pathname !== location?.pathname
    ) {
      originalLocation = location?.state?.from;
    }
    return <Redirect to={originalLocation} />;
  }

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="has-text-centered my-6">
            <h1 className="title">
              <FormattedMessage
                description="Login screen title"
                defaultMessage="Tokenized SDK demo"
                id="BWwoyB"
              />
            </h1>
            <p className="subtitle">
              <FormattedMessage
                description="Login screen subtitle"
                defaultMessage="Please sign in with your Tokenized account credentials"
                id="vaZlef"
              />
            </p>
          </div>
          {(needsMfa || showPairingCode) && (
            <section className="box hero is-warning">
              <div className="hero-body">
                {!showPairingCode && (
                  <>
                    <p className="title">
                      <FormattedMessage
                        description="Login screen mobile authentication prompt title"
                        defaultMessage="Welcome {fullName}"
                        id="wurpXL"
                        values={{ fullName: ownFormattedName }}
                      />
                    </p>
                    <progress
                      className="progress is-small is-primary"
                      max="100"
                    />
                    <p className="subtitle">
                      <FormattedMessage
                        description="Login screen mobile authentication prompt subtitle"
                        defaultMessage="Please confirm your identity in the authenticator app"
                        id="FEJ3nB"
                      />
                    </p>
                    <div className="buttons">
                      <button
                        onClick={onCancelSignIn}
                        className="button is-light"
                      >
                        <FormattedMessage
                          description="Login screen cancel button"
                          defaultMessage="Cancel"
                          id="GCPZxk"
                        />
                      </button>
                      <button
                        onClick={onDisplayPairingCode}
                        className="button is-info is-light"
                      >
                        <FormattedMessage
                          description="Login screen display pairing code button"
                          defaultMessage="Display pairing code…"
                          id="8MXtG4"
                        />
                      </button>
                    </div>
                  </>
                )}
                {showPairingCode && (
                  <>
                    <div className="is-flex is-justify-content-center">
                      <DevicePairingCode />
                    </div>
                    <p className="title has-text-centered mt-5">
                      <FormattedMessage
                        description="Login screen mobile authenticator pairing title"
                        defaultMessage="Pair with authenticator"
                        id="fFr3qj"
                      />
                    </p>
                    <p className="subtitle has-text-centered">
                      <FormattedMessage
                        description="Login screen mobile authenticator pairing subtitle"
                        defaultMessage="Scan this code in the Tokenized authenticator app to pair with account {fullName} and approve sign in"
                        id="C6Pp9+"
                        values={{ fullName: ownFormattedName }}
                      />
                    </p>
                    <div className="buttons is-centered">
                      <button
                        onClick={onCancelSignIn}
                        className="button is-light"
                      >
                        <FormattedMessage
                          description="Login screen cancel button"
                          defaultMessage="Cancel"
                          id="GCPZxk"
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
          )}
          {!(needsMfa || showPairingCode) && (
            <div className="box">
              {logInError?.formattedErrorMessage && logInError !== hideError && (
                <article className="message is-danger">
                  <div className="message-header">
                    <p>
                      <FormattedMessage
                        description="Login screen failed login error message title"
                        defaultMessage="Unable to sign in"
                        id="/QSoyN"
                      />
                    </p>
                    <button
                      className="delete"
                      aria-label="delete"
                      onClick={onDismissError}
                    ></button>
                  </div>
                  <div className="message-body">
                    {logInError.formattedErrorMessage}
                  </div>
                </article>
              )}
              <div className="buttons has-addons">
                <button
                  onClick={onSelectHandleId}
                  className={classNames(
                    'button',
                    identifierType === 'handle' && 'is-link is-selected',
                  )}
                >
                  <FormattedMessage
                    description="Login identification method selection: use your handle"
                    defaultMessage="Handle"
                    id="KoV/4d"
                  />
                </button>
                <button
                  onClick={onSelectEmailId}
                  className={classNames(
                    'button',
                    identifierType === 'email' && 'is-link is-selected',
                  )}
                >
                  <FormattedMessage
                    defaultMessage="Email"
                    description="Login identification method selection: use your email address"
                    id="oLcK9U"
                  />
                </button>
                <button
                  onClick={onSelectPhoneId}
                  className={classNames(
                    'button',
                    identifierType === 'phone' && 'is-link is-selected',
                  )}
                >
                  <FormattedMessage
                    defaultMessage="Phone"
                    description="Login identification method selection: use your phone number"
                    id="a7iBE2"
                  />
                </button>
              </div>
              <form onSubmit={onSignIn}>
                {identifierType === 'handle' && (
                  <div className="field">
                    <label className="label">
                      <FormattedMessage
                        defaultMessage="Account handle"
                        description="Login input field label: handle"
                        id="cjeVpa"
                      />
                    </label>
                    <div className="field has-addons">
                      <div className="control is-expanded">
                        <input
                          className="input"
                          type="text"
                          autoComplete="username"
                          value={handle}
                          onInput={onHandleInput}
                          placeholder="yourhandle"
                        />
                      </div>
                      <div className="control">
                        <span className="button is-static">
                          {handlePostfix}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {identifierType === 'email' && (
                  <div className="field">
                    <label className="label">
                      <FormattedMessage
                        defaultMessage="Account email address"
                        description="Login input field label: email"
                        id="YFXmr+"
                      />
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onInput={onEmailInput}
                        placeholder="registered@example.com"
                      />
                    </div>
                  </div>
                )}
                {identifierType === 'phone' && (
                  <div className="field">
                    <label className="label">
                      <FormattedMessage
                        defaultMessage="Account phone number"
                        description="Login input field label: phone number"
                        id="2yLUnh"
                      />
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="tel"
                        autoComplete="tel"
                        value={phoneNumber}
                        onInput={onPhoneNumberInput}
                        placeholder="+15551234567"
                      />
                    </div>
                  </div>
                )}
                <div className="field">
                  <label className="label">
                    <FormattedMessage
                      description="Login input field label: passphrase"
                      defaultMessage="Passphrase"
                      id="Kg4KGH"
                    />
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      autoComplete="current-password"
                      value={passphrase}
                      onInput={onPassphraseInput}
                    />
                  </div>
                </div>
                <button
                  className={classNames(
                    'button',
                    'is-primary',
                    isLoggingIn && 'is-loading',
                  )}
                  disabled={!signInButtonEnabled}
                >
                  <FormattedMessage
                    description="Login screen sign in button"
                    defaultMessage="Sign in"
                    id="Vt7Ozj"
                  />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
