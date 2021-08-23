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
  const identifierValidForRecovery = (fieldErrors) =>
    Object.entries(fieldErrors)
      .filter(([fieldName]) => fieldName !== 'passphrase')
      .every(([, fieldError]) => !fieldError);

  const logInError = useLogInError();
  const [hideError, setHideError] = useState(null);
  const onDismissError = useCallback(
    () => setHideError(logInError),
    [logInError],
  );

  return (
    <div className="box">
      <Form onSubmit={onSignIn}>
        {({ handleSubmit, values, valid, errors }) => (
          <form onSubmit={handleSubmit}>
            {logInError?.formattedErrorMessage && logInError !== hideError && (
              <article className="message is-danger">
                <div className="message-header">
                  <p>
                    <FormattedMessage
                      description="Login screen failed login error message title"
                      defaultMessage="Unable to sign in"
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
            <div className="tabs is-boxed">
              <ul>
                <li
                  className={classNames(
                    identifierType === 'handle' && 'is-active',
                  )}
                >
                  <Link
                    to={{
                      pathname: '/sign-in/handle',
                      state: location?.state,
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-id-badge" aria-hidden="true"></i>
                    </span>
                    <span>
                      <FormattedMessage
                        description="Login identification method selection: use your handle"
                        defaultMessage="Handle"
                      />
                    </span>
                  </Link>
                </li>
                <li
                  className={classNames(
                    identifierType === 'email' && 'is-active',
                  )}
                >
                  <Link
                    to={{
                      pathname: '/sign-in/email',
                      state: location?.state,
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-at" aria-hidden="true"></i>
                    </span>
                    <span>
                      <FormattedMessage
                        defaultMessage="Email"
                        description="Login identification method selection: use your email address"
                      />
                    </span>
                  </Link>
                </li>
                <li
                  className={classNames(
                    identifierType === 'phoneNumber' && 'is-active',
                  )}
                >
                  <Link
                    to={{
                      pathname: '/sign-in/phone-number',
                      state: location?.state,
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-mobile-alt" aria-hidden="true"></i>
                    </span>
                    <span>
                      <FormattedMessage
                        defaultMessage="Phone"
                        description="Login identification method selection: use your phone number"
                      />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            {identifierType === 'handle' && (
              <Field name="handle" validate={validateRequired}>
                {({ input, meta: { touched, error } }) => (
                  <div className="field">
                    <label className="label">
                      <FormattedMessage
                        defaultMessage="Account handle"
                        description="Login input field label: handle"
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
              {identifierValidForRecovery(errors) ? (
                <Link
                  to={{
                    pathname: '/forgot',
                    state: {
                      ...values,
                      identifierType,
                    },
                  }}
                  className="button is-light"
                  disabled={isLoggingIn}
                >
                  <FormattedMessage
                    defaultMessage="Forgot passphrase?"
                    description="Login screen forgot passphrase button"
                  />
                </Link>
              ) : (
                <button type="button" className="button is-light" disabled>
                  <FormattedMessage
                    defaultMessage="Forgot passphrase?"
                    description="Login screen forgot passphrase button"
                  />
                </button>
              )}
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
