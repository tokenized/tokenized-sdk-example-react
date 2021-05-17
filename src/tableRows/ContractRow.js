/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function ContractRow({ isHeader, contract }) {
  if (isHeader) {
    return (
      <tr>
        <th>Title</th>
        <th>Issuer / counterparty</th>
        <th>Type</th>
      </tr>
    );
  }
  if (!contract?.contractAddress) {
    return null;
  }
  return (
    <tr>
      <th>{contract?.name}</th>
      <td>{contract?.issuer?.name}</td>
      <td>{contract?.contractType}</td>
    </tr>
  );
}

export default ContractRow;
