/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FormattedNumber } from 'react-intl';

function BalanceRow({ isHeader, balance }) {
  if (isHeader) {
    return (
      <tr>
        <th className="has-text-left">Asset</th>
        <th className="has-text-left">Tokens</th>
        <th className="has-text-left">Face value</th>
        <th className="has-text-left">Display currency</th>
      </tr>
    );
  }
  return (
    <tr>
      <th className="has-text-left">{balance?.assetName}</th>
      <td>{balance?.quantities?.balance?.tokens?.formatted}</td>
      <td>
        {balance?.quantities?.balance?.faceValue && (
          <FormattedNumber
            value={balance.quantities.balance.faceValue.number}
            {...balance.quantities.balance.faceValue.NumberFormatOptions}
          />
        )}
      </td>
      <td>
        {balance?.quantities?.balance?.faceValue && (
          <FormattedNumber
            value={balance.quantities.balance.displayCurrency.number}
            {...balance.quantities.balance.displayCurrency.NumberFormatOptions}
          />
        )}
      </td>
    </tr>
  );
}

export default BalanceRow;
