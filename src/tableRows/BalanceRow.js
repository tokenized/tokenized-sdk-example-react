/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useAssetDetails } from '@tokenized/sdk-react-private';

function BalanceRow({ isHeader, balance }) {
  const assetDetails = useAssetDetails(balance?.assetId)?.data;

  let faceValue = '';
  if (assetDetails?.faceValue) {
    faceValue = `${assetDetails.faceValue.units} ${assetDetails.faceValue.currency}`;
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
    <tr key={balance.assetId}>
      <th>{assetDetails?.name || balance?.assetId}</th>
      <td>{faceValue}</td>
      <td>{balance?.availableUnits}</td>
      <td>{balance?.totalUnits}</td>
    </tr>
  );
}

export default BalanceRow;
