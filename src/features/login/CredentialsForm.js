import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  useIsLoggingIn,
  useLogInError,
} from '@tokenized/sdk-react-private';

function CredentialsForm() {
  const tokenizedApi = useTokenizedApi();
  const isLoggingIn = useIsLoggingIn();

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

  const logInError = useLogInError();
  const [hideError, setHideError] = useState(null);
  const onDismissError = useCallback(
    () => setHideError(logInError),
    [logInError],
  );

  return (
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
          <div className="message-body">{logInError.formattedErrorMessage}</div>
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
                <span className="button is-static">{handlePostfix}</span>
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
  );
}

export default CredentialsForm;
