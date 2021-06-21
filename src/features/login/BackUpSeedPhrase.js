/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import Downshift from 'downshift';
import {
  useTokenizedApi,
  useSeedPhraseWordsForBackup,
} from '@tokenized/sdk-react-private';
import { boldText, veryImportantText } from '../../utils/richTextFormat';

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
      tokenizedApi.account.confirmSeedPhraseBackup();
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
                  id="JvW0S/"
                />
              </p>
            </div>
            <div className="message-body content">
              <p>
                <FormattedMessage
                  defaultMessage="Transactions in your <boldText>non-custodial</boldText> account can only be authorized on your device using your passphrase-protected digital key. Your passphrase never leaves your device, so no one else ever has access to your funds, not even us."
                  description="Back up seed phrase intro 1"
                  values={{ boldText }}
                  id="IaE9fj"
                />
              </p>
              <p>
                <FormattedMessage
                  defaultMessage="However, that means we can’t restore access for you if you forget your passphrase. It’s therefore <boldText>essential that you record your digital key now</boldText>, in the form of a 24-word recovery phrase that you can enter with a new passphrase to restore access to your funds."
                  description="Back up seed phrase intro 2"
                  values={{ boldText }}
                  id="v9a1op"
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
              id="Wefkn1"
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
                id="Qi6Vpw"
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
                id="UIi3Ix"
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
                id="l1Zi41"
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
                  id="Bb9qyJ"
                />
              </p>
            </div>
            <div className="message-body">
              <FormattedMessage
                defaultMessage="Are you sure? Taking an account backup only takes a few minutes, and without it your funds will be permanently lost if you ever forget your passphrase"
                description="Postpone seed phrase backup risks 1"
                id="8HgVfG"
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
              id="Pgb70J"
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
                id="xu36fu"
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
                id="3eaHIh"
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
                  id="+WML42"
                />
              </p>
            </div>
            <div className="message-body">
              <FormattedMessage
                defaultMessage="This is the master key to your account. <veryImportantText>Do not share these words with anyone</veryImportantText>. Carefully write down all 24 words, or copy them into a password manager."
                description="Back up seed phrase instructions"
                values={{ veryImportantText }}
                id="emC2Xv"
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
                id="Qi6Vpw"
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
                id="fFkbdo"
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
            {({ handleSubmit, form, values, valid, submitting }) => {
              const onPaste = (event) => {
                event.preventDefault();
                const pastedWords = event.clipboardData.getData('Text');
                let newWords = pastedWords.split(/\s+/).slice(0, 24);
                newWords = Array.from(
                  new Array(24),
                  (_, index) => newWords[index] || '',
                );
                form.batch(() => {
                  form.change('words', newWords);
                  for (let index = 0; index < 24; index += 1) {
                    form.blur(`words[${index}]`);
                  }
                });
              };

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
                          id="Vt0wGh"
                        />
                      </p>
                    </div>
                    <div className="message-body">
                      <FormattedMessage
                        defaultMessage="Enter your recovery phrase from your backup to verify it. Note you can paste the whole phrase in one go from a password manager."
                        description="Verify seed phrase backup instructions"
                        id="J7uwgI"
                      />
                    </div>
                  </article>
                  <div className="columns is-mobile is-multiline">
                    {Array.from(new Array(24), (_, wordIndex) => (
                      <Field
                        key={`verify${wordIndex + 1}`}
                        name={`words[${wordIndex}]`}
                        validate={wordValidators[wordIndex]}
                      >
                        {({ input, meta: { touched, error } }) => (
                          <Downshift
                            {...input}
                            onInputValueChange={(inputValue) => {
                              input.onChange(inputValue);
                            }}
                            selectedItem={input.value}
                          >
                            {({
                              getInputProps,
                              getMenuProps,
                              getItemProps,
                              getLabelProps,
                              isOpen,
                              inputValue,
                              highlightedIndex,
                              selectedItem,
                            }) => {
                              const filteredItems =
                                inputValue && isOpen
                                  ? tokenizedApi.account.autocompleteSeedWord(
                                      inputValue,
                                    )
                                  : [];
                              return (
                                <div className="column is-2">
                                  <div
                                    className={classNames(
                                      'dropdown',
                                      isOpen &&
                                        !!filteredItems?.length &&
                                        'is-active',
                                    )}
                                  >
                                    <div className="dropdown-trigger">
                                      <div className="field">
                                        <div className="control is-expanded">
                                          <input
                                            className={classNames(
                                              'input',
                                              touched && error && 'is-danger',
                                            )}
                                            {...getInputProps({
                                              type: 'text',
                                              name: input.name,
                                              onPaste,
                                              onFocus: input.onFocus,
                                              onBlur: input.onBlur,
                                            })}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="dropdown-menu"
                                      {...getMenuProps()}
                                    >
                                      <div
                                        className="dropdown-content"
                                        style={{
                                          maxHeight: '198px',
                                          overflowY: 'auto',
                                        }}
                                      >
                                        {filteredItems.map(
                                          (suggestedWord, suggestionIndex) => (
                                            <a
                                              key={suggestedWord}
                                              href="#"
                                              className={classNames(
                                                'dropdown-item',
                                                highlightedIndex ===
                                                  suggestionIndex &&
                                                  'is-active',
                                                selectedItem ===
                                                  suggestedWord &&
                                                  'has-text-weight-bold',
                                              )}
                                              {...getItemProps({
                                                item: suggestedWord,
                                              })}
                                            >
                                              {suggestedWord}
                                            </a>
                                          ),
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="is-flex is-justify-content-center mt-1">
                                    <label
                                      className="has-text-grey is-unselectable"
                                      {...getLabelProps()}
                                    >
                                      {wordIndex + 1}
                                    </label>
                                  </div>
                                </div>
                              );
                            }}
                          </Downshift>
                        )}
                      </Field>
                    ))}
                  </div>
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
                        id="b37V5u"
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
                        id="Qi6Vpw"
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
                        id="Hg69xV"
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
