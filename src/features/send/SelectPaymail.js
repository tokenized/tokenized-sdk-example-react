import React, { useState } from 'react';
import { useCombobox } from 'downshift';
import { useHandles } from '@tokenized/sdk-react-private';
import classNames from 'classnames';

function SelectPaymail() {
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
    <div className={classNames('dropdown', isOpen && 'is-active')}>
      <label {...getLabelProps()}>To:</label>
      <div className="dropdown-trigger" {...getComboboxProps()}>
        <input className="input" type="text" {...getInputProps()} />
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content" {...getMenuProps()}>
          {items.map((item, index) => (
            <a
              className={classNames(
                'dropdown-item',
                highlightedIndex === index && 'is-active',
              )}
              key={item}
              {...getItemProps({ item, index })}
            >
              XX{item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectPaymail;
