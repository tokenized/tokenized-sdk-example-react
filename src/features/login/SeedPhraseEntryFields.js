import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Field } from 'react-final-form';
import Downshift from 'downshift';
import { useTokenizedApi } from '@tokenized/sdk-react-private';
import { useValidators, fieldIsRequired } from '../../utils/validators';

function SeedPhraseEntryFields({ form, wordValidators }) {
  const tokenizedApi = useTokenizedApi();
  const validateRequired = useValidators(fieldIsRequired);

  const onPaste = useCallback(
    (event) => {
      event.preventDefault();
      const pastedWords = event.clipboardData.getData('Text');
      let newWords = pastedWords.split(/\s+/).slice(0, 24);
      newWords = Array.from(new Array(24), (_, index) => newWords[index] || '');
      form.batch(() => {
        form.change('words', newWords);
        for (let index = 0; index < 24; index += 1) {
          form.blur(`words[${index}]`);
        }
      });
    },
    [form],
  );

  return (
    <div className="columns is-mobile is-multiline">
      {Array.from(new Array(24), (_, wordIndex) => (
        <Field
          key={`verify${wordIndex + 1}`}
          name={`words[${wordIndex}]`}
          validate={wordValidators?.[wordIndex] || validateRequired}
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
                    ? tokenizedApi.account.autocompleteSeedWord(inputValue)
                    : [];
                return (
                  <div className="column is-2">
                    <div
                      className={classNames(
                        'dropdown',
                        isOpen && !!filteredItems?.length && 'is-active',
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
                      <div className="dropdown-menu" {...getMenuProps()}>
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
                                  highlightedIndex === suggestionIndex &&
                                    'is-active',
                                  selectedItem === suggestedWord &&
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
  );
}

export default SeedPhraseEntryFields;
