import React from 'react';
import { Field } from 'react-final-form';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useTokenizedApi } from '@tokenized/sdk-react-private';
import { fieldRequired, fieldIsEmail } from '../../utils/validators';

function NewAccountNames({ handleSubmit, valid }) {
  const location = useLocation();
  const tokenizedApi = useTokenizedApi();
  const handlePostfix = tokenizedApi.account.getUserHandlePostfix();

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="columns">
          <div className="column">
            <Field name="firstName" validate={fieldRequired}>
              {({ input, meta: { touched, error } }) => (
                <div className="field">
                  <label className="label">
                    <FormattedMessage
                      defaultMessage="First name"
                      description="Sign up input field label: first name"
                      id="YGFyva"
                    />
                  </label>
                  <div className="control">
                    <input
                      className={classNames(
                        'input',
                        touched && error && 'is-danger',
                      )}
                      type="text"
                      autoComplete="given-name"
                      {...input}
                    />
                    {touched && !!error && (
                      <p className="help is-danger">{error}</p>
                    )}
                  </div>
                </div>
              )}
            </Field>
          </div>
          <div className="column">
            <Field name="lastName" validate={fieldRequired}>
              {({ input, meta: { touched, error } }) => (
                <div className="field">
                  <label className="label">
                    <FormattedMessage
                      defaultMessage="Last name"
                      description="Sign up input field label: last name"
                      id="MKs5lh"
                    />
                  </label>
                  <div className="control">
                    <input
                      className={classNames(
                        'input',
                        touched && error && 'is-danger',
                      )}
                      type="text"
                      autoComplete="family-name"
                      {...input}
                    />
                    {touched && !!error && (
                      <p className="help is-danger">{error}</p>
                    )}
                  </div>
                </div>
              )}
            </Field>
          </div>
        </div>
        <Field name="email" validate={fieldIsEmail}>
          {({ input, meta: { touched, error } }) => (
            <div className="field">
              <label className="label">
                <FormattedMessage
                  defaultMessage="Personal email"
                  description="Sign up input field label: email"
                  id="cB1RHb"
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
                  {...input}
                />
                {touched && !!error && (
                  <p className="help is-danger">{error}</p>
                )}
              </div>
            </div>
          )}
        </Field>
        <Field name="handle" validate={fieldRequired}>
          {({ input, meta: { touched, error } }) => (
            <div className="field">
              <label className="label">
                <FormattedMessage
                  defaultMessage="Paymail handle"
                  description="Sign up input field label: handle"
                  id="2oGVVt"
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
                    {...input}
                  />
                  {touched && !!error && (
                    <p className="help is-danger">{error}</p>
                  )}
                </div>
                <div className="control">
                  <span className="button is-static">{handlePostfix}</span>
                </div>
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
              description="New account continue button"
              defaultMessage="Continue"
              id="7BgPWf"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAccountNames;
