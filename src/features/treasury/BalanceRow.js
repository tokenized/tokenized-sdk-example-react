/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FormattedNumber } from 'react-intl';

function BalanceRow({ isHeader, balance }) {
  if (isHeader) {
    return (
      <tr>
        <th className="has-text-left">Asset</th>
        <th className="has-text-left">Issuer</th>
        <th className="has-text-left">In vault</th>
        <th className="has-text-left">Reserved</th>
        <th className="has-text-left">Issued</th>
        <th className="has-text-left">Authorized</th>
        <th className="has-text-left">One unit</th>
        <th className="has-text-left">Liability</th>
        <th className="has-text-left">Value</th>
      </tr>
    );
  }

  let quantity;
  if (balance?.quantities?.balance?.tokens) {
    quantity = balance?.quantities?.balance?.tokens.formatted;
  } else if (balance?.quantities?.balance?.faceValue) {
    quantity = (
      <FormattedNumber
        value={balance.quantities.balance.faceValue.number}
        {...balance.quantities.balance.faceValue.NumberFormatOptions}
      />
    );
  }

  let reserved;
  if (balance?.quantities?.reserved?.tokens) {
    reserved =
      balance?.quantities?.reserved?.tokens.number > 0 &&
      balance?.quantities?.reserved?.tokens.formatted;
  } else if (balance?.quantities?.reserved?.faceValue) {
    reserved = balance.quantities.reserved.faceValue.number > 0 && (
      <FormattedNumber
        value={balance.quantities.reserved.faceValue.number}
        {...balance.quantities.reserved.faceValue.NumberFormatOptions}
      />
    );
  }

  return (
    <tr>
      <th className="has-text-left">{balance?.assetName}</th>
      <td>{balance?.issuer?.formatted}</td>
      <td>{quantity}</td>
      <td>{reserved}</td>
      <td>
        {balance?.quantities?.issuedLiability?.tokens?.number > 0 &&
          balance?.quantities?.issuedLiability?.tokens?.formatted}
      </td>
      <td>{balance?.quantities?.authorizedQuantity?.tokens?.formatted}</td>
      <td>
        {balance?.quantities?.individualFaceValue?.faceValue && (
          <FormattedNumber
            value={balance.quantities.individualFaceValue.faceValue.number}
            {...balance.quantities.individualFaceValue.faceValue
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
