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
                      description="New account input field label: first name"
                      id="LfU0vg"
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
                      description="New account input field label: last name"
                      id="LwJoyw"
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
                  description="New account input field label: email"
                  id="BFmRsr"
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
                  description="New account input field label: handle"
                  id="BDkKXS"
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
              description="New account cancel button"
              id="QoOTpE"
            />
          </Link>
          <button type="submit" className="button is-primary" disabled={!valid}>
            <FormattedMessage
              defaultMessage="Continue"
              description="New account continue button"
              id="7BgPWf"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAccountNames;
