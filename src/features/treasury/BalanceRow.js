import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  InstrumentAmount,
  useInstrumentWithDetails,
} from '@tokenized/sdk-react-private';

export function BalanceHeader() {
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
          defaultMessage="Available"
          description="Balance table column header: quantity of balance available (not reserved)"
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

function BalanceRow({ balance }) {
  const balanceAmount = useInstrumentWithDetails(balance.quantities?.balance);
  const availableAmount = useInstrumentWithDetails(
    balance.quantities?.available,
  );
  const authorizedAmount = useInstrumentWithDetails(
    balance.quantities?.authorizedQuantity,
  );
  const issuedAmount = useInstrumentWithDetails(
    balance.quantities?.issuedLiability,
  );
  const unitValueAmount = balanceAmount.withQuantity({ amount: 1 });

  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <th className="has-text-left">{balanceAmount.formatInstrumentName()}</th>
      <td>
        {balanceAmount.formatInstrumentType({
          useCurrencyCodeForMoney: true,
        })}
      </td>
      <td>{balanceAmount.formatIssuerName()}</td>
      <td>
        <InstrumentAmount instrument={balanceAmount} showCurrencyCode />
      </td>
      <td>
        {availableAmount.quantity !== balanceAmount.quantity && (
          <InstrumentAmount instrument={availableAmount} hideCurrency />
        )}
      </td>
      <td>
        <InstrumentAmount instrument={issuedAmount} hideCurrency />
      </td>
      <td>
        <InstrumentAmount instrument={authorizedAmount} showWhenZero={false} />
      </td>
      <td>
        <InstrumentAmount
          instrument={unitValueAmount}
          showDisplayCurrency
          showWhenZero={false}
        />
      </td>
      <td>
        <InstrumentAmount
          instrument={issuedAmount}
          showDisplayCurrency
          showUnconvertableAmountAsZero
        />
      </td>
      <td>
        <InstrumentAmount
          instrument={balanceAmount}
          showDisplayCurrency
          showUnconvertableAmountAsZero
        />
      </td>
    </tr>
  );
}

export default BalanceRow;
