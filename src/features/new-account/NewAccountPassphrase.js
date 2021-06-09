import React from 'react';
import { Field } from 'react-final-form';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { fieldRequired } from '../../utils/validators';

function NewAccountPassphrase({ handleSubmit, valid }) {
  const location = useLocation();

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="button is-primary" disabled={!valid}>
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
