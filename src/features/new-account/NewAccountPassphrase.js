import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { fieldRequired, fieldIsEmail } from '../../utils/validators';

function NewAccountPassphrase({
  handleSubmit,
  hasValidationErrors,
  submitting,
  submitError,
}) {
  const location = useLocation();

  const [hideError, setHideError] = useState(null);

  // Note the email and handle fields are included but hidden,
  // so that password managers can deduce the full credentials
  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        {submitError && submitError !== hideError && (
          <article className="message is-danger">
            <div className="message-header">
              <p>
                <FormattedMessage
                  defaultMessage="Unable to create account"
                  description="New account failed error message title"
                  id="UBuArm"
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
        <Field name="handle" validate={fieldRequired}>
          {({ input }) => (
            <input
              style={{ display: 'none' }}
              type="text"
              autoComplete="username"
              {...input}
            />
          )}
        </Field>
        <Field name="email" validate={fieldIsEmail}>
          {({ input }) => (
            <input
              style={{ display: 'none' }}
              type="email"
              autoComplete="email"
              {...input}
            />
          )}
        </Field>
        <Field name="passphrase" validate={fieldRequired}>
          {({ input, meta: { touched, error } }) => (
            <div className="field">
              <label className="label">
                <FormattedMessage
                  defaultMessage="Create a passphrase"
                  description="New account input field label: create passphrase"
                  id="UT0wpI"
                />
              </label>
              <div className="control">
                <input
                  className={classNames(
                    'input',
                    touched && error && 'is-danger',
                  )}
                  type="password"
                  autoComplete="new-password"
                  {...input}
                />
                {touched && !!error && (
                  <p className="help is-danger">{error}</p>
                )}
              </div>
            </div>
          )}
        </Field>
        <Field name="passphraseConfirm" validate={fieldRequired}>
          {({ input, meta: { touched, error } }) => (
            <div className="field">
              <label className="label">
                <FormattedMessage
                  defaultMessage="Verify passphrase"
                  description="New account input field label: verify passphrase"
                  id="pTJMyU"
                />
              </label>
              <div className="control">
                <input
                  className={classNames(
                    'input',
                    touched && error && 'is-danger',
                  )}
                  type="password"
                  autoComplete="new-password"
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
              defaultMessage="Create account"
              description="New account create button"
              id="Z5nasz"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAccountPassphrase;
