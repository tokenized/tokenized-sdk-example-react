import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  useVerificationEmailAddress,
} from '@tokenized/sdk-react-private';
import { useValidators, fieldIsRequired } from '../../utils/validators';
import { boldText } from '../../utils/richTextFormat';

function AccountVerification() {
  const tokenizedApi = useTokenizedApi();
  const email = useVerificationEmailAddress();

  const validateRequired = useValidators(fieldIsRequired);

  const onCancelSignIn = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);
  const onSubmit = useCallback(
    async ({ code }, form) => {
      await tokenizedApi.account.verifyNewAccount(code);
      form.restart();
    },
    [tokenizedApi.account],
  );

  return (
    <div className="box">
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, hasValidationErrors, submitting }) => (
          <form onSubmit={handleSubmit}>
            <article className="message is-info">
              <div className="message-header">
                <p>
                  <FormattedMessage
                    defaultMessage="Verify your email"
                    description="Verify account email description title"
                    id="vELQTJ"
                  />
                </p>
              </div>
              <div className="message-body">
                <FormattedMessage
                  defaultMessage="To verify the account, enter the code sent to <boldText>{email}</boldText>"
                  values={{ email, boldText }}
                  description="Verify account email description"
                  id="q5NAaz"
                />
              </div>
            </article>
            <Field name="code" validate={validateRequired}>
              {({ input, meta: { touched, error } }) => (
                <div className="field">
                  <label className="label">
                    <FormattedMessage
                      defaultMessage="Verification code"
                      description="Verify account input field label: email verification code"
                      id="2ST6ee"
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
              <button
                type="button"
                onClick={onCancelSignIn}
                className="button is-light"
              >
                <FormattedMessage
                  defaultMessage="Cancel"
                  description="Verify account cancel button"
                  id="Pu+yE/"
                />
              </button>
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
                  description="Verify account confirm button"
                  id="3dxT5H"
                />
              </button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}

export default AccountVerification;
