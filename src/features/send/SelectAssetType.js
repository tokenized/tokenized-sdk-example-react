import React from 'react';
import { useSelect } from 'downshift';
import {
  useFilteredBalances,
  usePrimaryVault,
} from '@tokenized/sdk-react-private';
import classNames from 'classnames';

function SelectAssetType() {
  const vault = usePrimaryVault();
  const vaultId = vault?.id;

  const assetBalances = useFilteredBalances(vaultId, {});

  const items = assetBalances.data?.map(({ assetName }) => assetName) || [];

  console.log(assetBalances);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items });
  return (
    <div
      className={classNames('dropdown', isOpen && 'is-active')}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <label {...getLabelProps()}>Asset type:</label>
      <button type="button" {...getToggleButtonProps()}>
        {selectedItem || 'select...'}
      </button>
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
  );
}

export default SelectAssetType;
