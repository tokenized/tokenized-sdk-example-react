/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function BalanceRow({ isHeader, balance }) {
  let faceValue = '';
  if (balance?.assetTypeSpecifics?.faceValue) {
    faceValue = `${balance.assetTypeSpecifics.faceValue.units} ${balance.assetTypeSpecifics.faceValue.currency}`;
  }

  if (isHeader) {
    return (
      <tr>
        <th>Asset</th>
        <th>Face value</th>
        <th>Available units</th>
        <th>Total units</th>
      </tr>
    );
  }
  return (
    <tr>
      <th>{balance?.name || balance?.assetId}</th>
      <td>{faceValue}</td>
      <td>{balance?.availableUnits}</td>
      <td>{balance?.totalUnits}</td>
    </tr>
  );
}

export default BalanceRow;
