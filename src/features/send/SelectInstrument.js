import React from 'react';
import { useSelect } from 'downshift';
import classNames from 'classnames';
import {
  useFilteredBalances,
  usePrimaryVault,
  useInstrumentWithDetails,
  InstrumentAmount,
} from '@tokenized/sdk-react-private';
import { FormattedMessage } from 'react-intl';

function RenderInstrument({ balance, showAvailableBalance }) {
  const instrument = useInstrumentWithDetails(balance?.quantities?.available);

  return (
    <>
      <span>{instrument.formatInstrumentName()}</span>
      {showAvailableBalance && (
        <span>
          <InstrumentAmount instrument={instrument} showCurrencyCode />
        </span>
      )}
    </>
  );
}

export default function SelectInstrument({
  input,
  meta,
  showAvailableBalance = true,
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
    itemToString: ({ instrumentName }) => instrumentName,
    onSelectedItemChange: ({ selectedItem }) =>
      input.onChange(selectedItem?.instrumentId),
    selectedItem:
      items.find((balance) => balance.instrumentId === input.value) || null,
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
              <RenderInstrument
                balance={selectedItem}
                showAvailableBalance={showAvailableBalance}
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
              <RenderInstrument
                balance={item}
                showAvailableBalance={showAvailableBalance}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
