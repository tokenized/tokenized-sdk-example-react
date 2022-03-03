import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

function BalanceRow({ isHeader, balance }) {
  if (isHeader) {
    return (
      <tr>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Instrument"
            description="Balance table column header: instrument name"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Type"
            description="Balance table column header: instrument type"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Issuer"
            description="Balance table column header: instrument issuer"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="In vault"
            description="Balance table column header: quantity held in vault"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Reserved"
            description="Balance table column header: quantity of balance reserved"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Issued"
            description="Balance table column header: quantity issued by me"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Authorized"
            description="Balance table column header: quantity of instruments authorized in contract"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="One unit"
            description="Balance table column header: value of one instrument unit"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Liability"
            description="Balance table column header: liability (owed on issued instruments)"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Value"
            description="Balance table column header: value (of instruments to me)"
          />
        </th>
      </tr>
    );
  }

  let quantity;
  if (balance?.quantities?.balance?.tokens) {
    quantity = balance?.quantities?.balance?.tokens.formatted;
  } else if (balance?.quantities?.balance?.instrumentCurrency) {
    quantity = (
      <FormattedNumber
        value={balance.quantities.balance.instrumentCurrency.number}
        {...balance.quantities.balance.instrumentCurrency.NumberFormatOptions}
      />
    );
  }

  let reserved;
  if (balance?.quantities?.reserved?.tokens) {
    reserved =
      balance?.quantities?.reserved?.tokens.number > 0 &&
      balance?.quantities?.reserved?.tokens.formatted;
  } else if (balance?.quantities?.reserved?.instrumentCurrency) {
    reserved = balance.quantities.reserved.instrumentCurrency.number > 0 && (
      <FormattedNumber
        value={balance.quantities.reserved.instrumentCurrency.number}
        {...balance.quantities.reserved.instrumentCurrency.NumberFormatOptions}
      />
    );
  }

  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <th className="has-text-left">{balance?.instrumentName}</th>
      <td>{balance?.instrumentType?.formatted}</td>
      <td>{balance?.issuer?.formatted}</td>
      <td>{quantity}</td>
      <td>{reserved}</td>
      <td>
        {balance?.quantities?.issuedLiability?.tokens?.number > 0 &&
          balance?.quantities?.issuedLiability?.tokens?.formatted}
      </td>
      <td>{balance?.quantities?.authorizedQuantity?.tokens?.formatted}</td>
      <td>
        {balance?.quantities?.unitValue?.displayCurrency && (
          <FormattedNumber
            value={balance.quantities.unitValue.displayCurrency.number}
            {...balance.quantities.unitValue.displayCurrency
              .NumberFormatOptions}
          />
        )}
      </td>
      <td>
        {balance?.quantities?.issuedLiability?.displayCurrency && (
          <FormattedNumber
            value={balance.quantities.issuedLiability.displayCurrency.number}
            {...balance.quantities.issuedLiability.displayCurrency
              .NumberFormatOptions}
          />
        )}
      </td>
      <td>
        {balance?.quantities?.value?.displayCurrency && (
          <FormattedNumber
            value={balance.quantities.value.displayCurrency.number}
            {...balance.quantities.value.displayCurrency.NumberFormatOptions}
          />
        )}
      </td>
    </tr>
  );
}

export default BalanceRow;
