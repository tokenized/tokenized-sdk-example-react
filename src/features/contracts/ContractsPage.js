/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useContracts } from '@tokenized/sdk-react-private';
import ContractRow from './ContractRow';

function ContractsPage() {
  const contracts = useContracts();

  return (
    <section className="section">
      <h1 className="title">Contracts</h1>
      {contracts?.isLoading && (
        <progress className="progress is-small is-primary mt-5" max="100" />
      )}
      {contracts?.data && (
        <table className="table is-hoverable">
          <thead>
            <ContractRow isHeader />
          </thead>
          <tbody>
            {Object.values(contracts.data).map((contract) => (
              <ContractRow key={contract.contractAddress} contract={contract} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ContractsPage;