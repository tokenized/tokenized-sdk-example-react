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
            id="/lBke1"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Issuer / counterparty"
            description="Contracts table column header: contract issuer / counterparty"
            id="cxOmHD"
          />
        </th>
        <th className="has-text-left">
          <FormattedMessage
            defaultMessage="Type"
            description="Contracts table column header: contract type"
            id="cnwMLl"
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
