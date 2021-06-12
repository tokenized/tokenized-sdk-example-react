import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useValidators, fieldIsRequired } from '../../utils/validators';

function NewAccountVerification({
  handleSubmit,
  values,
  hasValidationErrors,
  submitting,
  submitError,
}) {
  const location = useLocation();

  const validateRequired = useValidators(fieldIsRequired);

  const [hideError, setHideError] = useState(null);

  // Note the email, handle, and passphrase fields are included but hidden,
  // so that password managers can deduce the full credentials
  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        {submitError && submitError !== hideError && (
          <article className="message is-danger">
            <div className="message-header">
              <p>
                <FormattedMessage
                  defaultMessage="Unable to verify new account"
                  description="New account verify failed error message title"
                  id="ljBbFZ"
                />
              </p>
              <button
                className="delete"
                aria-label="delete"
                onClick={() => setHideError(submitError)}
              ></button>
            </div>
            <div className="message-body">{`${submitError}`}</div>
          </article>
        )}
        <article className="message is-info">
          <div className="message-header">
            <p>
              <FormattedMessage
                defaultMessage="Verify your email"
                description="New account verify email description title"
                id="dyjW1T"
              />
            </p>
          </div>
          <div className="message-body">
            <FormattedMessage
              defaultMessage="To create your new account, enter the email verification code sent to {email}"
              values={{ email: values?.email }}
              description="New account verify email description"
              id="3M+zLD"
            />
          </div>
        </article>
        <Field name="handle">
          {({ input }) => (
            <input
              className="is-hidden"
              type="text"
              autoComplete="username"
              {...input}
            />
          )}
        </Field>
        <Field name="email">
          {({ input }) => (
            <input
              className="is-hidden"
              type="email"
              autoComplete="email"
              {...input}
            />
          )}
        </Field>
        <Field name="passphrase">
          {({ input }) => (
            <input
              className="is-hidden"
              type="password"
              autoComplete="new-password"
              {...input}
            />
          )}
        </Field>
        <Field name="code" validate={validateRequired}>
          {({ input, meta: { touched, error } }) => (
            <div className="field">
              <label className="label">
                <FormattedMessage
                  defaultMessage="Verification code"
                  description="New account input field label: email verification code"
                  id="8SZXVP"
                />
              </label>
              <div className="control">
                <input
                  className={classNames(
                    'input',
                    touched && error && 'is-danger',
                  )}
                  type="text"
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
          <Link
            to={{
              pathname: '/sign-in',
              state: location?.state,
            }}
            className="button is-light"
          >
            <FormattedMessage
              defaultMessage="Cancel"
              description="New account cancel button"
              id="QoOTpE"
            />
          </Link>
          <button
            type="submit"
            className={classNames(
              'button',
              'is-primary',
              submitting && 'is-loading',
            )}
            disabled={submitting || hasValidationErrors}
          >
            <FormattedMessage
              defaultMessage="Verify"
              description="New account verify code to complete button"
              id="cStYuC"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAccountVerification;
