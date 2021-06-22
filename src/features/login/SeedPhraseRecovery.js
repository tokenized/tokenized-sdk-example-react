import React, { useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { useTokenizedApi } from '@tokenized/sdk-react-private';
import SeedPhraseEntryFields from './SeedPhraseEntryFields';

function SeedPhraseRecovery() {
  const tokenizedApi = useTokenizedApi();

  const [step, setStep] = useState('entry');
  const onCancelSignIn = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);

  const [postponeConfirm, setPostponeConfirm] = useState(false);
  const onChangePostponeConfirm = useCallback(
    () => setPostponeConfirm((confirm) => !confirm),
    [],
  );
  const onPostpone = useCallback(() => {
    setPostponeConfirm(false);
    setStep('postpone');
  }, []);
  const onCancelPostpone = useCallback(() => setStep('entry'), []);
  const onConfirmPostpone = useCallback(
    () => tokenizedApi.account.skipRestoreRootKey(),
    [tokenizedApi.account],
  );

  const validatePhrase = useMemo(
    () => tokenizedApi.account.makeDebouncedRecoveryPhraseValidator(),
    [tokenizedApi.account],
  );
  const validateWords = useCallback(
    async ({ words }) => {
      // If some words are missing, we don’t bother validating the
      // incomplete phrase and return no error – the individual
      // field validators will report those errors.
      if (words?.length === 24 && words.every((word) => word)) {
        const phrase = words.join(' ');
        const validationError = await validatePhrase(phrase);
        if (validationError) {
          return {
            [FORM_ERROR]: validationError,
          };
        }
      }
    },
    [validatePhrase],
  );

  const onRestore = useCallback(
    async ({ words }) => {
      try {
        const phrase = words.join(' ');
        await tokenizedApi.account.restoreRootKey(phrase);
      } catch (error) {
        console.error(error);
        return { [FORM_ERROR]: error };
      }
    },
    [tokenizedApi.account],
  );

  switch (step) {
    case 'entry':
    default:
      return (
        <div className="box">
          <Form onSubmit={onRestore} validate={validateWords}>
            {({
              handleSubmit,
              form,
              valid,
              submitting,
              validating,
              error,
              submitError,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <article className="message is-warning">
                    <div className="message-header">
                      <p>
                        <span className="icon mr-2">
                          <i className="fas fa-unlock-alt"></i>
                        </span>
                        <FormattedMessage
                          tagName="span"
                          defaultMessage="Account recovery"
                          description="Account recovery description title"
                          id="jOID+q"
                        />
                      </p>
                    </div>
                    <div className="message-body">
                      <FormattedMessage
                        defaultMessage="Your account’s digital key is invalid, or has been reset. To restore full access to your funds, please enter the 24-word recovery seed that you noted down when you created the account."
                        description="Account recovery description"
                        id="DH7vcX"
                      />
                    </div>
                  </article>
                  <SeedPhraseEntryFields form={form} />
                  {(submitError || error) && (
                    <article className="message is-danger">
                      <div className="message-body">{`${
                        submitError || error
                      }`}</div>
                    </article>
                  )}
                  <div className="buttons is-right mt-6">
                    <button
                      type="button"
                      onClick={onCancelSignIn}
                      className="button is-light"
                    >
                      <FormattedMessage
                        defaultMessage="Cancel"
                        description="Account recovery cancel button"
                        id="qHI9UA"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={onPostpone}
                      className="button is-danger is-light"
                    >
                      <FormattedMessage
                        defaultMessage="Later…"
                        description="Account recovery later button"
                        id="2F0CgA"
                      />
                    </button>
                    <button
                      type="submit"
                      className={classNames(
                        'button',
                        'is-primary',
                        (submitting || validating) && 'is-loading',
                      )}
                      disabled={!valid || submitting}
                    >
                      {valid && (
                        <span className="icon is-small">
                          <i className="fas fa-check"></i>
                        </span>
                      )}
                      <FormattedMessage
                        tagName="span"
                        defaultMessage="Restore"
                        description="Account recovery confirm button"
                        id="9maDsa"
                      />
                    </button>
                  </div>
                </form>
              );
            }}
          </Form>
        </div>
      );
    case 'postpone':
      return (
        <div className="box">
          <article className="message is-danger">
            <div className="message-header">
              <p>
                <span className="icon mr-2">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
                <FormattedMessage
                  tagName="span"
                  defaultMessage="Sign in with invalid key"
                  description="Confirm skip account restore title"
                  id="IssfGQ"
                />
              </p>
            </div>
            <div className="message-body">
              <FormattedMessage
                defaultMessage="Please be aware that you’ll be able to see your activity and treasury, but all asset transfers and contract operations will fail."
                description="Confirm skip account restore description"
                id="vutAZJ"
              />
            </div>
          </article>
          <label className="checkbox">
            <input
              type="checkbox"
              className="mr-2"
              checked={postponeConfirm}
              onChange={onChangePostponeConfirm}
            />
            <FormattedMessage
              defaultMessage="I understand my account is not fully operational"
              description="Skip account restore confirmation"
              id="KGfoNb"
            />
          </label>
          <div className="buttons is-left mt-6">
            <button
              type="button"
              onClick={onCancelPostpone}
              className="button is-primary"
            >
              <span className="icon is-small">
                <i className="fas fa-chevron-left"></i>
              </span>
              <FormattedMessage
                tagName="span"
                defaultMessage="Restore account now"
                description="Skip account restore cancel (restore after all) button"
                id="H6n8rw"
              />
            </button>
            <div className="is-flex-grow-1" />
            <button
              type="button"
              onClick={onConfirmPostpone}
              className="button is-danger"
              disabled={!postponeConfirm}
            >
              <FormattedMessage
                defaultMessage="Sign in anyway"
                description="Confirm skip account restore button"
                id="XIPU1j"
              />
            </button>
          </div>
        </div>
      );
  }
}

export default SeedPhraseRecovery;
