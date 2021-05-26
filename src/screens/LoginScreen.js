import React, { useState, useCallback } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  useIsLoading,
  useIsLoggingIn,
  useLogInNeedsMfa,
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
  const isLoggedIn = useIsLoggedIn();
  const ownFormattedName = useOwnFormattedName();

  const [handle, setHandle] = useState('');
  const onHandleInput = useCallback(
    (event) => setHandle(event.target.value),
    [setHandle],
  );
  const handlePostfix = tokenizedApi.getUserHandlePostfix();
  const [passphrase, setPassphrase] = useState('');
  const onPassphraseInput = useCallback(
    (event) => setPassphrase(event.target.value),
    [setPassphrase],
  );

  const onSignIn = useCallback(
    (event) => {
      event.preventDefault();
      tokenizedApi.logIn({ handle, passphrase });
      setHandle('');
      setPassphrase('');
    },
    [handle, passphrase, tokenizedApi],
  );

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
          {needsMfa && (
            <section className="box hero is-warning">
              <div className="hero-body">
                <p className="title">
                  <FormattedMessage
                    description="Login screen mobile authentication prompt title"
                    defaultMessage="Welcome {fullName}"
                    id="wurpXL"
                    values={{ fullName: ownFormattedName }}
                  />
                </p>
                <progress className="progress is-small is-primary" max="100" />
                <p className="subtitle">
                  <FormattedMessage
                    description="Login screen mobile authentication prompt subtitle"
                    defaultMessage="Please confirm your identity in the authenticator app"
                    id="FEJ3nB"
                  />
                </p>
              </div>
            </section>
          )}
          {!needsMfa && (
            <form className="box" onSubmit={onSignIn}>
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
              <label className="label">
                <FormattedMessage
                  description="Login input field name: identify your account using your handle"
                  defaultMessage="Handle"
                  id="J5JGM9"
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
                  />
                </div>
                <div className="control">
                  <span className="button is-static">{handlePostfix}</span>
                </div>
              </div>
              <div className="field">
                <label className="label">
                  <FormattedMessage
                    description="Login input field name: passphrase"
                    defaultMessage="Passphrase"
                    id="kUSQxB"
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
                disabled={!handle || !passphrase}
              >
                <FormattedMessage
                  description="Login screen sign in button"
                  defaultMessage="Sign in"
                  id="Vt7Ozj"
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
