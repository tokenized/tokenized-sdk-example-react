import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import { useHandles } from '@tokenized/sdk-react-private';
import classNames from 'classnames';

function SelectPaymail({ input }) {
  const [search, setSearch] = useState('');

  const handles = useHandles(search);

  const items = handles?.data?.map(({ displayHandle }) => displayHandle) || [];

  console.log(handles);

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
    onInputValueChange: ({ inputValue }) => setSearch(inputValue),
  });
  return (
    <>
      <div
        className={classNames('dropdown', isOpen && 'is-active')}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label {...getLabelProps()}>To:</label>
        <div className="dropdown-trigger" {...getComboboxProps()}>
          <input
            className="input"
            type="text"
            {...getInputProps()}
            {...input}
          />
        </div>
        <div className="dropdown-menu" style={{ right: 0 }}>
          <div
            className="dropdown-content"
            {...getMenuProps()}
            style={{ maxHeight: '10em', overflow: 'auto' }}
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
