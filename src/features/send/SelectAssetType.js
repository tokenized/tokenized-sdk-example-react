import React from 'react';
import { useSelect } from 'downshift';
import classNames from 'classnames';
import {
  useFilteredBalances,
  usePrimaryVault,
} from '@tokenized/sdk-react-private';
import { FormattedMessage } from 'react-intl';
import FormatQuantity from '../../utils/FormatQuantity';

function RenderAssetType({ assetType }) {
  return (
    <>
      <span>{assetType.assetName}</span>
      <span>
        <FormatQuantity
          quantity={assetType.quantities?.balance}
          showCouponName={false}
        />
      </span>
    </>
  );
}

function SelectAssetType({ input, meta }) {
  const vaultId = usePrimaryVault()?.id;
  const assetBalances = useFilteredBalances(vaultId, {
    includeInactive: false,
  });
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
        <FormattedMessage defaultMessage="Asset" />
      </label>
      <div className="control">
        <button
          type="button"
          {...getToggleButtonProps()}
          className="input is-justify-content-space-between"
        >
          <span className="is-flex-grow-1 is-flex is-justify-content-space-between">
            {selectedItem ? (
              <RenderAssetType assetType={selectedItem} />
            ) : (
              <FormattedMessage defaultMessage="Select an asset" />
            )}
          </span>
          <span className="icon is-small ml-3">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
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
