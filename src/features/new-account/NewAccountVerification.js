import React from 'react';
import { Field } from 'react-final-form';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { fieldRequired } from '../../utils/validators';

function NewAccountVerification({ handleSubmit, values, valid }) {
  const location = useLocation();

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
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
        <Field name="code" validate={fieldRequired}>
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
              id="QoOTpE"
              description="New account cancel button"
            />
          </Link>
          <button type="submit" className="button is-primary" disabled={!valid}>
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
