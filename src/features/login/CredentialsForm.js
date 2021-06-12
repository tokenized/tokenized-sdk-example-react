import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import {
  useTokenizedApi,
  useIsLoggingIn,
  useLogInError,
} from '@tokenized/sdk-react-private';
import {
  useValidators,
  fieldIsRequired,
  fieldIsEmail,
} from '../../utils/validators';

function CredentialsForm({ identifierType }) {
  const location = useLocation();
  const tokenizedApi = useTokenizedApi();
  const isLoggingIn = useIsLoggingIn();
  const handlePostfix = tokenizedApi.account.getUserHandlePostfix();

  const validateRequired = useValidators(fieldIsRequired);
  const validateEmail = useValidators(fieldIsEmail);

  const onSignIn = useCallback(
    ({ handle, email, phoneNumber, passphrase }, form) => {
      switch (identifierType) {
        case 'handle':
        default:
          tokenizedApi.account.logIn({ handle, passphrase });
          break;
        case 'email':
          tokenizedApi.account.logIn({ email, passphrase });
          break;
        case 'phoneNumber':
          tokenizedApi.account.logIn({ phoneNumber, passphrase });
          break;
      }
      form.restart();
    },
    [identifierType, tokenizedApi.account],
  );

  const logInError = useLogInError();
  const [hideError, setHideError] = useState(null);
  const onDismissError = useCallback(
    () => setHideError(logInError),
    [logInError],
  );

  return (
    <div className="box">
      <Form onSubmit={onSignIn}>
        {({ handleSubmit, values, valid }) => (
          <form onSubmit={handleSubmit}>
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
              <Link
                type="button"
                to={{
                  pathname: '/sign-in/handle',
                  state: location?.state,
                }}
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
              </Link>
              <Link
                type="button"
                to={{
                  pathname: '/sign-in/email',
                  state: location?.state,
                }}
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
              </Link>
              <Link
                type="button"
                to={{
                  pathname: '/sign-in/phone-number',
                  state: location?.state,
                }}
                className={classNames(
                  'button',
                  identifierType === 'phoneNumber' && 'is-link is-selected',
                )}
              >
                <FormattedMessage
                  defaultMessage="Phone"
                  description="Login identification method selection: use your phone number"
                  id="a7iBE2"
                />
              </Link>
            </div>
            {identifierType === 'handle' && (
              <Field name="handle" validate={validateRequired}>
                {({ input, meta: { touched, error } }) => (
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
                          className={classNames(
                            'input',
                            touched && error && 'is-danger',
                          )}
                          style={{ zIndex: 1 }}
                          type="text"
                          autoComplete="username"
                          placeholder="yourhandle"
                          {...input}
                        />
                        {touched && !!error && (
                          <p className="help is-danger">{error}</p>
                        )}
                      </div>
                      <div className="control">
                        <span className="button is-static">
                          {handlePostfix}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Field>
            )}
            {identifierType === 'email' && (
              <Field name="email" validate={validateEmail}>
                {({ input, meta: { touched, error } }) => (
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
                        className={classNames(
                          'input',
                          touched && error && 'is-danger',
                        )}
                        type="email"
                        autoComplete="email"
                        placeholder="registered@example.com"
                        {...input}
                      />
                      {touched && !!error && (
                        <p className="help is-danger">{error}</p>
                      )}
                    </div>
                  </div>
                )}
              </Field>
            )}
            {identifierType === 'phoneNumber' && (
              <Field name="phoneNumber" validate={validateRequired}>
                {({ input, meta: { touched, error } }) => (
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
                        className={classNames(
                          'input',
                          touched && error && 'is-danger',
                        )}
                        type="tel"
                        autoComplete="tel"
                        placeholder="+15551234567"
                        {...input}
                      />
                      {touched && !!error && (
                        <p className="help is-danger">{error}</p>
                      )}
                    </div>
                  </div>
                )}
              </Field>
            )}
            <Field name="passphrase" validate={validateRequired}>
              {({ input, meta: { touched, error } }) => (
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
                      className={classNames(
                        'input',
                        touched && error && 'is-danger',
                      )}
                      component="input"
                      type="password"
                      autoComplete="current-password"
                      {...input}
                    />
                    {touched && !!error && (
                      <p className="help is-danger">{error}</p>
                    )}
                  </div>
                </div>
              )}
            </Field>
            <div className="buttons is-right mt-6">
              <button
                type="submit"
                className={classNames(
                  'button',
                  'is-primary',
                  isLoggingIn && 'is-loading',
                )}
                disabled={!valid || isLoggingIn}
              >
                <FormattedMessage
                  description="Login screen sign in button"
                  defaultMessage="Sign in"
                  id="Vt7Ozj"
                />
              </button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}

export default CredentialsForm;
