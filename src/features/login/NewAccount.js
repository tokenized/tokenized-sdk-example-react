import React, { useCallback, useMemo, useState } from 'react';
import { Field } from 'react-final-form';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useIntl, FormattedMessage } from 'react-intl';
import { useTokenizedApi } from '@tokenized/sdk-react-private';
import {
  useValidators,
  fieldIsRequired,
  fieldIsEmail,
} from '../../utils/validators';

function NewAccount({
  handleSubmit,
  validating,
  hasValidationErrors,
  submitError,
}) {
  const location = useLocation();
  const intl = useIntl();
  const tokenizedApi = useTokenizedApi();
  const handlePostfix = tokenizedApi.account.getUserHandlePostfix();
  const validateRequired = useValidators(fieldIsRequired);

  const isEmailAvailable = useMemo(
    () => tokenizedApi.account.makeDebouncedEmailAvailabilityChecker(),
    [tokenizedApi.account],
  );
  const validateEmailAvailable = useCallback(
    async (intl, email) => {
      const available = await isEmailAvailable(email);
      if (!available) {
        return intl.formatMessage({
          defaultMessage: 'That email is already in use',
          description: 'New account field validation error: email in use',
          id: 'fnlNdQ',
        });
      }
    },
    [isEmailAvailable],
  );
  const validateEmail = useValidators(fieldIsEmail, validateEmailAvailable);

  const isHandleAvailable = useMemo(
    () => tokenizedApi.account.makeDebouncedHandleAvailabilityChecker(),
    [tokenizedApi.account],
  );
  const validateHandleAvailable = useCallback(
    async (intl, handle) => {
      const available = await isHandleAvailable(handle);
      if (!available) {
        return intl.formatMessage({
          defaultMessage: 'That handle is already in use',
          description: 'New account field validation error: handle in use',
          id: '4Ud2UA',
        });
      }
    },
    [isHandleAvailable],
  );
  const validateHandle = useValidators(
    fieldIsRequired,
    validateHandleAvailable,
  );

  const [hideError, setHideError] = useState(null);

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
        <div className="columns">
          <div className="column">
            <Field
              name="firstName"
              validate={validateRequired}
              validateFields={[]}
            >
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
            <Field
              name="lastName"
              validate={validateRequired}
              validateFields={[]}
            >
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
        <Field name="email" validate={validateEmail} validateFields={[]}>
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
                    (fieldIsEmail(intl, input?.value) === undefined ||
                      touched) &&
                      error &&
                      'is-danger',
                  )}
                  type="email"
                  autoComplete="email"
                  {...input}
                />
                <p className="help">
                  <FormattedMessage
                    defaultMessage="Avoid workplace or educational emails you might lose access to"
                    description="New account email field help: advice to pick personal accounts"
                    id="1s3HAo"
                  />
                </p>
                {(fieldIsEmail(intl, input?.value) === undefined || touched) &&
                  !!error && <p className="help is-danger">{error}</p>}
              </div>
            </div>
          )}
        </Field>
        <Field name="handle" validate={validateHandle} validateFields={[]}>
          {({ input, meta: { error, touched } }) => (
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
                      (input?.value || touched) && error && 'is-danger',
                    )}
                    style={{ zIndex: 1 }}
                    type="text"
                    autoComplete="username"
                    {...input}
                  />
                  <p className="help">
                    <FormattedMessage
                      defaultMessage="Choose a unique ID for connecting with others and receiving payments"
                      description="New account handle field help: explanation of paymail"
                      id="0EfTim"
                    />
                  </p>
                  {(!!input?.value || touched) && !!error && (
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
          <button
            type="submit"
            className={classNames(
              'button',
              'is-primary',
              validating && 'is-loading',
            )}
            disabled={hasValidationErrors || validating}
          >
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

export default NewAccount;
