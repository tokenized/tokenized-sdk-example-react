import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import {
  useTokenizedApi,
  useIsLoading,
  useIsLoggingIn,
  useLoginNeedsMfa,
  useIsLoggedIn,
  useLoginError,
  useUserFullName,
} from '@tokenized/sdk-js-private';
import LoadingScreen from './LoadingScreen';

function LoginScreen() {
  const tokenizedApi = useTokenizedApi();
  const isLoading = useIsLoading();
  const isLoggingIn = useIsLoggingIn();
  const needsMfa = useLoginNeedsMfa();
  const isLoggedIn = useIsLoggedIn();
  const loginError = useLoginError();
  const fullName = useUserFullName();

  const [handle, setHandle] = useState('');
  const onHandleInput = useCallback((event) => setHandle(event.target.value), [
    setHandle,
  ]);
  const handlePostfix = tokenizedApi.getUserHandlePostfix();
  const [passphrase, setPassphrase] = useState('');
  const onPassphraseInput = useCallback(
    (event) => setPassphrase(event.target.value),
    [setPassphrase],
  );

  const onSignIn = useCallback(
    (event) => {
      event.preventDefault();
      tokenizedApi.login({ handle, passphrase });
      setHandle('');
      setPassphrase('');
    },
    [handle, passphrase, tokenizedApi],
  );

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="has-text-centered my-6">
            <h1 className="title">Tokenized SDK demo</h1>
            <p className="subtitle">
              Please sign in with your Tokenized profile credentials
            </p>
          </div>
          {needsMfa && (
            <section className="box hero is-warning">
              <div className="hero-body">
                <p className="title">Welcome {fullName}</p>
                <progress className="progress is-small is-primary" max="100" />
                <p className="subtitle">
                  Please confirm your identity in the authenticator app
                </p>
              </div>
            </section>
          )}
          {!needsMfa && (
            <form className="box" onSubmit={onSignIn}>
              {loginError && (
                <article className="message is-danger">
                  <div className="message-header">
                    <p>Unable to sign in</p>
                  </div>
                  <div className="message-body">{`${loginError}`}</div>
                </article>
              )}
              <label className="label">Handle</label>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    value={handle}
                    onInput={onHandleInput}
                  />
                </div>
                <div className="control">
                  <span className="button is-static">{handlePostfix}</span>
                </div>
              </div>
              <div className="field">
                <label className="label">Passphrase</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
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
                Sign in
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
