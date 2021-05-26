/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function ContractRow({ isHeader, contract }) {
  if (isHeader) {
    return (
      <tr>
        <th className="has-text-left">Title</th>
        <th className="has-text-left">Issuer / counterparty</th>
        <th className="has-text-left">Type</th>
      </tr>
    );
  }
  if (!contract?.contractAddress) {
    return null;
  }
  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <th className="has-text-left">{contract?.name}</th>
      <td>{contract?.issuer?.name}</td>
      <td>{contract?.contractType}</td>
    </tr>
  );
}

export default ContractRow;
