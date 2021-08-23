import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useContracts } from '@tokenized/sdk-react-private';
import ContractRow from './ContractRow';

function ContractsPage() {
  const contracts = useContracts();

  return (
    <section className="section">
      <h1 className="title">
        <FormattedMessage
          defaultMessage="Contracts"
          description="Contracts page title"
        />
      </h1>
      {contracts?.isLoading && (
        <progress className="progress is-small is-primary mt-5" max="100" />
      )}
      {contracts?.data && (
        <div className="table-container">
          <table className="table is-hoverable">
            <thead>
              <ContractRow isHeader />
            </thead>
            <tbody>
              {Object.values(contracts.data).map((contract) => (
                <ContractRow
                  key={contract.contractAddress}
                  contract={contract}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ContractsPage;
