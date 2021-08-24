import React, { useCallback, useMemo, useState } from 'react';
import { Field } from 'react-final-form';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useTokenizedApi } from '@tokenized/sdk-react-private';
import { useValidators, fieldIsRequired } from '../../utils/validators';

const doesFieldMatchPassphrase = (intl, passphraseConfirm, { passphrase }) => {
  if (passphraseConfirm !== passphrase) {
    return intl.formatMessage({
      defaultMessage: 'Doesn’t match entered passphrase',
      description:
        'Form field validation failure: matching passphrase confirmation is required',
    });
  }
};

function mapStrengthToColor(strengthScore) {
  if (strengthScore >= 4) {
    return 'is-success';
  }
  if (strengthScore >= 3) {
    return 'is-warning';
  }
  return 'is-danger';
}

function NewPassphrase({
  isNewAccount,
  handleSubmit,
  hasValidationErrors,
  submitting,
  submitError,
  values,
}) {
  const location = useLocation();
  const tokenizedApi = useTokenizedApi();

  const [showPassphrases, setShowPassphrases] = useState(false);
  const toggleShowPassphrase = useCallback(
    () => setShowPassphrases((current) => !current),
    [],
  );

  const validatePassphraseConfirm = useValidators(
    fieldIsRequired,
    doesFieldMatchPassphrase,
  );

  const minPassphraseLength = tokenizedApi.account.PASSPHRASE_MIN_LENGTH || 10;
  const passphraseAnalysis = useMemo(
    () =>
      tokenizedApi.account.analyzePassphraseStrength(values?.passphrase, [
        values?.firstName,
        values?.lastName,
        values?.email,
        values?.handle,
      ]),
    [
      tokenizedApi.account,
      values?.email,
      values?.firstName,
      values?.handle,
      values?.lastName,
      values?.passphrase,
    ],
  );
  const validateAcceptableStrength = useCallback(
    (intl, validateValue, validateValues) =>
      tokenizedApi.account.analyzePassphraseStrength(validateValue, [
        validateValues?.firstName,
        validateValues?.lastName,
        validateValues?.email,
        validateValues?.handle,
      ]).rejectionMessage,
    [tokenizedApi.account],
  );
  const validatePassphrase = useValidators(
    fieldIsRequired,
    validateAcceptableStrength,
  );

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
                {isNewAccount ? (
                  <FormattedMessage
                    defaultMessage="Unable to create account"
                    description="New account failed error message title"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="Unable to reset passphrase"
                    description="Reset passphrase failed error message title"
                  />
                )}
              </p>
              <button
                type="button"
                className="delete"
                aria-label="delete"
                onClick={() => setHideError(submitError)}
              />
            </div>
            <div className="message-body">{`${submitError}`}</div>
          </article>
        )}
        {isNewAccount && (
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
        )}
        {isNewAccount && (
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
        )}
        <Field name="passphrase" validate={validatePassphrase}>
          {({ input, meta: { touched, error } }) => (
            <div className="field">
              <label className="level label">
                <div className="level-left">
                  <div className="level-item">
                    <span>
                      <FormattedMessage
                        defaultMessage="Create a passphrase"
                        description="New account or reset passphrase input field label: create passphrase"
                      />
                    </span>
                  </div>
                  {input?.value && passphraseAnalysis?.formattedStrength && (
                    <div className="level-item">
                      <span
                        className={classNames(
                          'tag',
                          'is-rounded',
                          mapStrengthToColor(passphraseAnalysis?.strengthScore),
                        )}
                      >
                        {passphraseAnalysis.formattedStrength}
                      </span>
                    </div>
                  )}
                </div>
              </label>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className={classNames(
                      'input',
                      (input?.value?.length >= minPassphraseLength ||
                        touched) &&
                        error &&
                        'is-danger',
                    )}
                    style={{ zIndex: 1 }}
                    type={showPassphrases ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...input}
                  />
                  {(input?.value?.length >= minPassphraseLength || touched) &&
                    !!error && <p className="help is-danger">{error}</p>}
                </div>
                <div className="control">
                  <button
                    type="button"
                    className={classNames(
                      'button',
                      showPassphrases && 'is-info',
                    )}
                    title="Show passphrases"
                    onClick={toggleShowPassphrase}
                  >
                    <span className="icon">
                      <i
                        className={
                          showPassphrases ? 'fas fa-eye' : 'fas fa-eye-slash'
                        }
                      ></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </Field>
        <Field name="passphraseConfirm" validate={validatePassphraseConfirm}>
          {({ input, meta: { touched, error } }) => (
            <div className="field">
              <label className="label">
                <FormattedMessage
                  defaultMessage="Verify passphrase"
                  description="New account or reset passphrase input field label: verify passphrase"
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
                    type={showPassphrases ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...input}
                  />
                  {touched && !!error && (
                    <p className="help is-danger">{error}</p>
                  )}
                </div>
                <div className="control">
                  <button
                    type="button"
                    className={classNames(
                      'button',
                      showPassphrases && 'is-info',
                    )}
                    title="Show passphrases"
                    onClick={toggleShowPassphrase}
                  >
                    <span className="icon">
                      <i
                        className={
                          showPassphrases ? 'fas fa-eye' : 'fas fa-eye-slash'
                        }
                      ></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </Field>
        <article className="message is-info">
          <div className="message-body content">
            <h6>Suggestions</h6>
            <ul>
              {passphraseAnalysis?.suggestions?.length > 0 &&
                passphraseAnalysis?.suggestions.map((suggestion) => (
                  <li key={suggestion}>{suggestion}</li>
                ))}
            </ul>
          </div>
        </article>
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
              description="New account or reset passphrase cancel button"
            />
          </Link>
          <button
            type="submit"
            className={classNames(
              'button',
              'is-primary',
              submitting && 'is-loading',
            )}
            disabled={
              hasValidationErrors ||
              submitting ||
              (!!submitError && !isNewAccount)
            }
          >
            {isNewAccount ? (
              <FormattedMessage
                defaultMessage="Create account"
                description="New account create button"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Reset and sign in"
                description="Reset passphrase button"
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPassphrase;
