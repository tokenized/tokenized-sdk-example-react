import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {
  useTokenizedApi,
  useResetPassphraseMaskedEmail,
} from '@tokenized/sdk-react-private';
import { useValidators, fieldIsRequired } from '../../utils/validators';
import { boldText } from '../../utils/richTextFormat';
import NewPassphrase from './NewPassphrase';

function ForgotPassphrase() {
  const tokenizedApi = useTokenizedApi();
  const maskedEmail = useResetPassphraseMaskedEmail();
  const { state: { handle, email, phoneNumber, identifierType } = {} } =
    useLocation() || {};
  const history = useHistory();

  const validateRequired = useValidators(fieldIsRequired);

  const [step, setStep] = useState('start');
  const onStart = useCallback(async () => {
    try {
      switch (identifierType) {
        case 'handle':
        default:
          await tokenizedApi.account.requestPassphraseReset({ handle });
          break;
        case 'email':
          await tokenizedApi.account.requestPassphraseReset({ email });
          break;
        case 'phoneNumber':
          await tokenizedApi.account.requestPassphraseReset({ phoneNumber });
          break;
      }
    } catch (error) {
      console.error(error);
      return { [FORM_ERROR]: error };
    }
    setStep('confirmEmail');
  }, [email, handle, identifierType, phoneNumber, tokenizedApi.account]);
  const onConfirmEmail = useCallback(() => setStep('newPassphrase'), []);

  const onResetPassphrase = useCallback(
    async ({ code, passphrase, passphraseConfirm }) => {
      try {
        await tokenizedApi.account.resetPassphrase({
          code,
          passphrase,
          passphraseConfirm,
        });
      } catch (error) {
        return { [FORM_ERROR]: error };
      }
      history.push('/sign-in', location?.state);
    },
    [history, tokenizedApi.account],
  );

  switch (step) {
    case 'start':
    default:
      return (
        <div className="box">
          <Form onSubmit={onStart}>
            {({ handleSubmit, submitting, submitError }) => (
              <form onSubmit={handleSubmit}>
                <article className="message is-warning">
                  <div className="message-header">
                    <p>
                      <span className="icon mr-2">
                        <i className="fa-solid fa-unlock-alt"></i>
                      </span>
                      <FormattedMessage
                        tagName="span"
                        defaultMessage="Forgot your passphrase?"
                        description="Forgot passphrase introduction title"
                      />
                    </p>
                  </div>
                  <div className="message-body content">
                    <FormattedMessage
                      defaultMessage="To restore full access to the account <bold>{identifier}</bold>, you’ll need to confirm your registered email, create a new passphrase, and sign in. Then enter your 24-word recovery phrase to complete the process."
                      values={{
                        bold: boldText,
                        identifier: handle || email || phoneNumber,
                      }}
                      description="Forgot passphrase introduction"
                    />
                  </div>
                </article>
                {submitError && (
                  <article className="message is-danger">
                    <div className="message-body">{`${submitError}`}</div>
                  </article>
                )}
                <div className="buttons is-right mt-6">
                  <Link to="/sign-in" className="button is-light">
                    <FormattedMessage
                      defaultMessage="Cancel"
                      description="Forgot passphrase cancel button"
                    />
                  </Link>
                  <button
                    type="submit"
                    className={classNames(
                      'button',
                      'is-primary',
                      submitting && 'is-loading',
                    )}
                    disabled={submitting || !!submitError}
                  >
                    <FormattedMessage
                      tagName="span"
                      defaultMessage="Begin recovery"
                      description="Forgot passphrase start button"
                    />
                    <span className="icon is-small">
                      <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </Form>
        </div>
      );
    case 'confirmEmail':
    case 'newPassphrase':
      return (
        <Form onSubmit={onResetPassphrase}>
          {step === 'confirmEmail'
            ? ({ handleSubmit, hasValidationErrors }) => (
                <div className="box">
                  <form onSubmit={handleSubmit}>
                    <article className="message is-warning">
                      <div className="message-header">
                        <p>
                          <FormattedMessage
                            defaultMessage="Confirm registered email"
                            description="Forgot passphrase confirm email title"
                          />
                        </p>
                      </div>
                      <div className="message-body">
                        <FormattedMessage
                          defaultMessage="A confirmation code has been sent to <bold>{maskedEmail}</bold>. Enter the code below to continue recovery. In the next step we’ll ask you for a new passphrase."
                          values={{ maskedEmail, bold: boldText }}
                          description="Forgot passphrase confirm email description"
                        />
                      </div>
                    </article>
                    <Field name="code" validate={validateRequired}>
                      {({ input, meta: { touched, error } }) => (
                        <div className="field">
                          <label className="label">
                            <FormattedMessage
                              defaultMessage="Confirmation code"
                              description="Forgot passphrase input field label: email confirmation code"
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
                      <Link to="/sign-in" className="button is-light">
                        <FormattedMessage
                          defaultMessage="Cancel"
                          description="Forgot passphrase cancel button"
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={onConfirmEmail}
                        className="button is-primary"
                        disabled={hasValidationErrors}
                      >
                        <FormattedMessage
                          tagName="span"
                          defaultMessage="Continue"
                          description="Forgot passphrase confirm email continue button"
                        />
                        <span className="icon is-small">
                          <i className="fa-solid fa-chevron-right"></i>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              )
            : (formProps) => <NewPassphrase {...formProps} />}
        </Form>
      );
  }
}

export default ForgotPassphrase;
