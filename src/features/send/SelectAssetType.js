import React from 'react';
import { useSelect } from 'downshift';
import classNames from 'classnames';
import {
  useFilteredBalances,
  usePrimaryVault,
} from '@tokenized/sdk-react-private';
import { FormattedMessage } from 'react-intl';

const $ = {
  'Asset type': (
    <FormattedMessage
      defaultMessage="Asset type"
      description="Asset transfer: Asset type label"
      id="Z4zU9p"
    />
  ),
  'select...': (
    <FormattedMessage
      defaultMessage="select..."
      description="Asset transfer: Asset type select prompt"
      id="Z8qLYY"
    />
  ),
};

function RenderAssetType({ assetType }) {
  return (
    <>
      <span>{assetType.assetName}</span>
      <span>{assetType.quantities?.balance.assetCurrency.number}</span>
    </>
  );
}

function SelectAssetType({ input, meta }) {
  const assetBalances = useFilteredBalances(usePrimaryVault()?.id, {});
  //const items = assetBalances?.data?.map(({ assetName }) => assetName) || [];
  const items = assetBalances?.data || [];

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    onSelectedItemChange: ({ selectedItem }) => input.onChange(selectedItem),
    itemToString: ({ assetName }) => assetName,
    selectedItem: input.value,
  });
  return (
    <div
      className={classNames('field', 'dropdown', isOpen && 'is-active')}
      style={{ display: 'block' }}
    >
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label className="label" {...getLabelProps()}>
        {$['Asset type']}
      </label>
      <div className="control">
        <button
          type="button"
          {...getToggleButtonProps()}
          className="input"
          style={{ justifyContent: 'space-between' }}
        >
          {selectedItem ? (
            <RenderAssetType assetType={selectedItem} />
          ) : (
            $['select...']
          )}
        </button>
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
              key={item.assetName}
              {...getItemProps({ item, index })}
              style={{ justifyContent: 'space-between', display: 'flex' }}
            >
              <RenderAssetType assetType={item} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectAssetType;
