import { FormattedMessage } from 'react-intl';
import React from 'react';

function ContractRow({ isHeader, contract }) {
  if (isHeader) {
    return (
      <tr>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Title"
            description="Contracts table column header: contract title"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Issuer / counterparty"
            description="Contracts table column header: contract issuer / counterparty"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Type"
            description="Contracts table column header: contract type"
          />
        </th>
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
