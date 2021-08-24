import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import { useHandles } from '@tokenized/sdk-react-private';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

function SelectPaymail({ input, meta }) {
  const [search, setSearch] = useState('');

  const handles = useHandles(search, { excludeSelf: true });
  const items = handles?.data?.map(({ displayHandle }) => displayHandle) || [];

  const { onBlur, onChange } = input;
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    onInputValueChange: ({ inputValue }) => {
      setSearch(inputValue);
      onChange(inputValue);
    },
  });
  return (
    <>
      <div
        className={classNames('field', 'dropdown', isOpen && 'is-active')}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div className="dropdown-trigger" {...getComboboxProps()}>
          {meta.touched && meta.error && (
            <span className="has-text-danger is-pulled-right">
              {meta.error}
            </span>
          )}
          <label className="label" {...getLabelProps()}>
            <FormattedMessage
              defaultMessage="To"
              description="Recipient selection label"
            />
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              {...getInputProps({ onBlur, onChange })}
            />
          </div>
        </div>
        <div className="dropdown-menu" style={{ right: 0 }}>
          <div
            className="dropdown-content"
            {...getMenuProps()}
            style={{ maxHeight: '20em', overflow: 'auto' }}
          >
            {items.map((item, index) => (
              <a
                className={classNames(
                  'dropdown-item',
                  highlightedIndex === index && 'is-active',
                )}
                key={item}
                {...getItemProps({ item, index })}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectPaymail;
