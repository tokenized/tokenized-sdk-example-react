import React from 'react';
import { useSelect } from 'downshift';
import classNames from 'classnames';
import {
  useFilteredBalances,
  usePrimaryVault,
} from '@tokenized/sdk-react-private';
import { FormattedMessage } from 'react-intl';
import FormatQuantity from '../../utils/FormatQuantity';

function RenderInstrumentType({ instrumentType, showQuantity }) {
  return (
    <>
      <span>{instrumentType.instrumentName}</span>
      {showQuantity && (
        <span>
          <FormatQuantity
            quantity={instrumentType.quantities?.balance}
            showCouponName={false}
          />
        </span>
      )}
    </>
  );
}

export default function SelectInstrumentType({
  input,
  meta,
  showQuantity = true,
  disabled,
}) {
  const vaultId = usePrimaryVault()?.id;
  const instrumentBalances = useFilteredBalances({
    vaultId,
    includeInactive: false,
  });
  const items = instrumentBalances?.data || [];

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    onSelectedItemChange: ({ selectedItem }) => input.onChange(selectedItem),
    itemToString: ({ instrumentName }) => instrumentName,
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
      <div className="control">
        <button
          type="button"
          {...getToggleButtonProps({ disabled })}
          className="input is-justify-content-space-between"
        >
          <span className="is-flex-grow-1 is-flex is-justify-content-space-between">
            {selectedItem ? (
              <RenderInstrumentType
                instrumentType={selectedItem}
                showQuantity={showQuantity}
              />
            ) : (
              <FormattedMessage defaultMessage="Select an instrument" />
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
              key={item.instrumentName}
              {...getItemProps({ item, index })}
              style={{ justifyContent: 'space-between', display: 'flex' }}
            >
              <RenderInstrumentType instrumentType={item} showQuantity={showQuantity} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
