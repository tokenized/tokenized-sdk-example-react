import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

function BalanceRow({ isHeader, balance }) {
  if (isHeader) {
    return (
      <tr>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Asset"
            description="Balance table column header: asset name"
            id="41ypwV"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Type"
            description="Balance table column header: asset type"
            id="hTxeee"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Issuer"
            description="Balance table column header: asset issuer"
            id="isZs2i"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="In vault"
            description="Balance table column header: quantity held in vault"
            id="QaB4nu"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Reserved"
            description="Balance table column header: quantity of balance reserved"
            id="D6bG5X"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Issued"
            description="Balance table column header: quantity issued by me"
            id="kYHpnu"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Authorized"
            description="Balance table column header: quantity of assets authorized in contract"
            id="Ih3sF+"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="One unit"
            description="Balance table column header: value of one asset unit"
            id="SOA+3t"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Liability"
            description="Balance table column header: liability (owed on issued assets)"
            id="6I1l1I"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Value"
            description="Balance table column header: value (of assets to me)"
            id="VyIxs7"
          />
        </th>
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
    <tr style={{ whiteSpace: 'nowrap' }}>
      <th className="has-text-left">{balance?.assetName}</th>
      <td>{balance?.assetType?.formatted}</td>
      <td>{balance?.issuer?.formatted}</td>
      <td>{quantity}</td>
      <td>{reserved}</td>
      <td>
        {balance?.quantities?.issuedLiability?.tokens?.number > 0 &&
          balance?.quantities?.issuedLiability?.tokens?.formatted}
      </td>
      <td>{balance?.quantities?.authorizedQuantity?.tokens?.formatted}</td>
      <td>
        {balance?.quantities?.individualFaceValue?.displayCurrency && (
          <FormattedNumber
            value={
              balance.quantities.individualFaceValue.displayCurrency.number
            }
            {...balance.quantities.individualFaceValue.displayCurrency
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
