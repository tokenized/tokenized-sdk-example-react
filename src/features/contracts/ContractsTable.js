import React from 'react';
import { useContracts } from '@tokenized/sdk-react-private';
import ContractRow, { ContractHeader } from './ContractRow';

export default function ContractsTable({ type }) {
  let filters;
  switch (type) {
    case 'active':
      filters = {
        includeActiveContracts: true,
        includeDraftContracts: false,
        includeEndedContracts: false,
      };
      break;
    case 'drafts':
      filters = {
        includeActiveContracts: false,
        includeDraftContracts: true,
        includeEndedContracts: false,
      };
      break;
    case 'ended':
      filters = {
        includeActiveContracts: false,
        includeDraftContracts: false,
        includeEndedContracts: true,
      };
      break;
    default:
      break;
  }
  const contracts = useContracts(filters);

  if (contracts?.isLoading) {
    return <progress className="progress is-small is-primary mt-5" max="100" />;
  }

  return (
    <div className="table-container">
      <table className="table is-hoverable">
        <thead>
          <ContractHeader showAction={type === 'open'} />
        </thead>
        <tbody>
          {contracts?.data?.map?.((contract) => (
            <ContractRow
              key={contract?.contractAddress || contract?.draft?.id}
              contract={contract}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
