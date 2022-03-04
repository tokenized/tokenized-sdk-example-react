import React from 'react';
import { FormattedMessage, FormattedDate } from 'react-intl';
import {
  useContractForRender,
  useContractAmendmentDiff,
} from '@tokenized/sdk-react-private';

export function ContractHeader() {
  return (
    <tr>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="Title"
          description="Contracts table column header"
        />
      </th>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="Issuer / counterparty"
          description="Contracts table column header"
        />
      </th>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="Last modified"
          description="Contracts table column header"
        />
      </th>
    </tr>
  );
}

function ContractRow({ contract }) {
  contract = useContractForRender(contract);

  const id = contract?.contractAddress || contract?.draft?.id;
  const numberOfPendingChanges =
    useContractAmendmentDiff(contract)?.totalChanges || 0;
  const hasAmendment =
    !contract?.isExpired && (contract?.isDraft || numberOfPendingChanges > 0);

  if (!id) {
    return null;
  }
  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <td className="has-text-left">
        <div className="has-text-weight-bold">{contract?.formatted?.name}</div>
        <div>
          {contract?.formatted?.type}
          {hasAmendment && (
            <>
              <span>{'  ·  '}</span>
              <FormattedMessage
                defaultMessage="Editing"
                description="Contracts list status for contract with edits in progress"
              />
            </>
          )}
        </div>
      </td>
      <td>{contract?.issuer?.name || contract?.issuerHandle}</td>
      <td>
        <FormattedDate
          value={
            new Date(contract?.draft?.dateModified || contract?.dateModified)
          }
          dateStyle="short"
          timeStyle="short"
        />
      </td>
    </tr>
  );
}

export default ContractRow;
