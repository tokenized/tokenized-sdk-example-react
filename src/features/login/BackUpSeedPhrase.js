import React, { useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {
  useTokenizedApi,
  useSeedPhraseWordsForBackup,
} from '@tokenized/sdk-react-private';
import { boldText, veryImportantText } from '../../utils/richTextFormat';
import SeedPhraseEntryFields from './SeedPhraseEntryFields';

function BackUpSeedPhrase() {
  const tokenizedApi = useTokenizedApi();
  const words = useSeedPhraseWordsForBackup();

  const [step, setStep] = useState('start');
  const onCancelSignIn = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);

  const [ready, setReady] = useState(false);
  const onChangeReady = useCallback(() => setReady((ready) => !ready), []);
  const onShowPhrase = useCallback(() => setStep('showPhrase'), []);
  const onPhraseRecorded = useCallback(() => setStep('verifyPhrase'), []);

  const [postponeConfirm, setPostponeConfirm] = useState(false);
  const onChangePostponeConfirm = useCallback(
    () => setPostponeConfirm((confirm) => !confirm),
    [],
  );
  const onPostpone = useCallback(() => {
    setPostponeConfirm(false);
    setStep('postpone');
  }, []);
  const onCancelPostpone = useCallback(() => {
    setReady(false);
    setStep('start');
  }, []);
  const onConfirmPostpone = useCallback(
    () => tokenizedApi.account.skipSeedPhraseBackup(),
    [tokenizedApi.account],
  );

  const wordValidators = useMemo(
    () =>
      Array.from(
        new Array(24),
        // Note the validation error text is never shown, so
        // no need to localize
        (_, index) => (value) =>
          value && value === words?.[index] ? undefined : 'Wrong',
      ),
    [words],
  );
  const onVerifyBackup = useCallback(async () => {
    try {
      await tokenizedApi.account.confirmSeedPhraseBackup();
    } catch (error) {
      console.error(error);
      return { [FORM_ERROR]: error };
    }
  }, [tokenizedApi.account]);

  switch (step) {
    case 'start':
    default:
      return (
        <div className="box">
          <article className="message is-warning">
            <div className="message-header">
              <p>
                <span className="icon mr-2">
                  <i className="fas fa-key"></i>
                </span>
                <FormattedMessage
                  tagName="span"
                  defaultMessage="Account backup (essential)"
                  description="Back up seed phrase description title"
                />
              </p>
            </div>
            <div className="message-body content">
              <p>
                <FormattedMessage
                  defaultMessage="Transactions in your <bold>non-custodial</bold> account can only be authorized on your device using your passphrase-protected digital key. Your passphrase never leaves your device, so no one else ever has access to your funds, not even us."
                  description="Back up seed phrase intro 1"
                  values={{ bold: boldText }}
                />
              </p>
              <p>
                <FormattedMessage
                  defaultMessage="However, that means we can’t restore access for you if you forget your passphrase. It’s therefore <bold>essential that you record your digital key now</bold>, in the form of a 24-word recovery phrase that you can enter with a new passphrase to restore access to your funds."
                  description="Back up seed phrase intro 2"
                  values={{ bold: boldText }}
                />
              </p>
            </div>
          </article>
          <label className="checkbox">
            <input
              type="checkbox"
              className="mr-2"
              checked={ready}
              onChange={onChangeReady}
            />
            <FormattedMessage
              defaultMessage="I’m ready to record my private recovery phrase, and nobody’s watching"
              description="Back up seed phrase confirm safe to show"
            />
          </label>
          <div className="buttons is-right mt-6">
            <button
              type="button"
              onClick={onCancelSignIn}
              className="button is-light"
            >
              <FormattedMessage
                defaultMessage="Cancel"
                description="Back up seed phrase cancel button"
              />
            </button>
            <button
              type="button"
              onClick={onPostpone}
              className="button is-danger is-light"
            >
              <FormattedMessage
                defaultMessage="Later…"
                description="Back up seed phrase later button"
              />
            </button>
            <button
              type="button"
              onClick={onShowPhrase}
              className="button is-primary"
              disabled={!ready}
            >
              <FormattedMessage
                tagName="span"
                defaultMessage="Show phrase"
                description="Back up seed phrase confirm button"
              />
              <span className="icon is-small">
                <i className="fas fa-chevron-right"></i>
              </span>
            </button>
          </div>
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
                  defaultMessage="Postpone backup"
                  description="Postpone seed phrase backup title"
                />
              </p>
            </div>
            <div className="message-body">
              <FormattedMessage
                defaultMessage="Are you sure? Taking an account backup only takes a few minutes, and without it your funds will be permanently lost if you ever forget your passphrase"
                description="Postpone seed phrase backup risks 1"
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
              defaultMessage="I understand the risks"
              description="Postpone seed phrase backup risks confirmation"
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
                defaultMessage="I’ve changed my mind"
                description="Postpone seed phrase backup cancel (back up after all) button"
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
                defaultMessage="Sign in without backup"
                description="Postpone seed phrase backup confirm button"
              />
            </button>
          </div>
        </div>
      );
    case 'showPhrase':
      return (
        <div className="box">
          <article className="message is-warning">
            <div className="message-header">
              <p>
                <span className="icon mr-2">
                  <i className="fas fa-key"></i>
                </span>
                <FormattedMessage
                  tagName="span"
                  defaultMessage="Record your recovery phrase"
                  description="Back up seed phrase description title"
                />
              </p>
            </div>
            <div className="message-body">
              <FormattedMessage
                defaultMessage="This is the master key to your account. <important>Do not share these words with anyone</important>. Carefully write down all 24 words, or copy them into a password manager."
                description="Back up seed phrase instructions"
                values={{ important: veryImportantText }}
              />
            </div>
          </article>
          <div className="columns is-mobile is-multiline">
            {words.map((word, index) => (
              <div
                key={`word${index + 1}`}
                className="column is-2 has-text-centered"
              >
                <div className="has-text-weight-bold">{word}</div>
                <hr className="my-1" />
                <div className="has-text-grey" style={{ userSelect: 'none' }}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="buttons is-right mt-6">
            <button
              type="button"
              onClick={onCancelSignIn}
              className="button is-light"
            >
              <FormattedMessage
                defaultMessage="Cancel"
                description="Back up seed phrase cancel button"
              />
            </button>
            <button
              type="button"
              className="button is-primary"
              onClick={onPhraseRecorded}
            >
              <FormattedMessage
                tagName="span"
                defaultMessage="Next"
                description="Back up seed phrase next button"
              />
              <span className="icon is-small">
                <i className="fas fa-chevron-right"></i>
              </span>
            </button>
          </div>
        </div>
      );
    case 'verifyPhrase':
      return (
        <div className="box">
          <Form onSubmit={onVerifyBackup}>
            {({ handleSubmit, form, valid, submitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <article className="message is-info">
                    <div className="message-header">
                      <p>
                        <span className="icon mr-2">
                          <i className="fas fa-clipboard-check"></i>
                        </span>
                        <FormattedMessage
                          tagName="span"
                          defaultMessage="Verify your backup"
                          description="Verify seed phrase backup description title"
                        />
                      </p>
                    </div>
                    <div className="message-body">
                      <FormattedMessage
                        defaultMessage="Enter your recovery phrase from your backup to verify it. Note you can paste the whole phrase in one go from a password manager."
                        description="Verify seed phrase backup instructions"
                      />
                    </div>
                  </article>
                  <SeedPhraseEntryFields
                    form={form}
                    wordValidators={wordValidators}
                  />
                  <div className="buttons is-left mt-6">
                    <button
                      type="button"
                      className="button is-primary is-light"
                      onClick={onShowPhrase}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-chevron-left"></i>
                      </span>
                      <FormattedMessage
                        tagName="span"
                        defaultMessage="Back"
                        description="Back up seed phrase show phrase again button"
                      />
                    </button>
                    <div className="is-flex-grow-1" />
                    <button
                      type="button"
                      onClick={onCancelSignIn}
                      className="button is-light"
                    >
                      <FormattedMessage
                        defaultMessage="Cancel"
                        description="Back up seed phrase cancel button"
                      />
                    </button>
                    <button
                      type="submit"
                      className={classNames(
                        'button',
                        'is-primary',
                        submitting && 'is-loading',
                      )}
                      disabled={!valid || submitting}
                    >
                      <FormattedMessage
                        tagName="span"
                        defaultMessage="Confirm"
                        description="Verify seed phrase backup confirm button"
                      />
                      {valid && (
                        <span className="icon is-small">
                          <i className="fas fa-check"></i>
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              );
            }}
          </Form>
        </div>
      );
  }
}

export default BackUpSeedPhrase;
