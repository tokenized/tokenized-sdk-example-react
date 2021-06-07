import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import {
  useTokenizedApi,
  useIsLoggingIn,
  useLogInError,
} from '@tokenized/sdk-react-private';
import { fieldRequired, fieldIsEmail } from '../../utils/validators';

function validateHandle(value, { identifierType }) {
  if (identifierType === 'handle') {
    return fieldRequired(value);
  }
}
function validateEmail(value, { identifierType }) {
  if (identifierType === 'email') {
    return fieldIsEmail(value);
  }
}
function validatePhoneNumber(value, { identifierType }) {
  if (identifierType === 'phoneNumber') {
    return fieldRequired(value);
  }
}

function CredentialsForm() {
  const tokenizedApi = useTokenizedApi();
  const isLoggingIn = useIsLoggingIn();
  const handlePostfix = tokenizedApi.account.getUserHandlePostfix();

  const onSignIn = useCallback(
    ({ identifierType, handle, email, phoneNumber, passphrase }, form) => {
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
    [tokenizedApi.account],
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
            <Field name="identifierType" initialValue="handle">
              {({ input: { value, onChange } }) => (
                <div className="buttons has-addons">
                  <button
                    type="button"
                    onClick={() => onChange('handle')}
                    className={classNames(
                      'button',
                      value === 'handle' && 'is-link is-selected',
                    )}
                  >
                    <FormattedMessage
                      description="Login identification method selection: use your handle"
                      defaultMessage="Handle"
                      id="KoV/4d"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('email')}
                    className={classNames(
                      'button',
                      value === 'email' && 'is-link is-selected',
                    )}
                  >
                    <FormattedMessage
                      defaultMessage="Email"
                      description="Login identification method selection: use your email address"
                      id="oLcK9U"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('phoneNumber')}
                    className={classNames(
                      'button',
                      value === 'phoneNumber' && 'is-link is-selected',
                    )}
                  >
                    <FormattedMessage
                      defaultMessage="Phone"
                      description="Login identification method selection: use your phone number"
                      id="a7iBE2"
                    />
                  </button>
                </div>
              )}
            </Field>
            <Field name="handle" validate={validateHandle}>
              {({ input, meta: { touched, error } }) =>
                values.identifierType === 'handle' && (
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
                )
              }
            </Field>
            <Field name="email" validate={validateEmail}>
              {({ input, meta: { touched, error } }) =>
                values.identifierType === 'email' && (
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
                )
              }
            </Field>
            <Field name="phoneNumber" validate={validatePhoneNumber}>
              {({ input, meta: { touched, error } }) =>
                values.identifierType === 'phoneNumber' && (
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
                )
              }
            </Field>
            <Field name="passphrase" validate={fieldRequired}>
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
          </form>
        )}
      </Form>
    </div>
  );
}

export default CredentialsForm;
