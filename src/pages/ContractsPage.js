/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useContracts } from '@tokenized/sdk-react-private';
import ContractRow from '../tableRows/ContractRow';

function TreasuryPage() {
  const contracts = useContracts();

  return (
    <section className="section">
      <h1 className="title">Contracts</h1>
      {contracts?.isLoading && <h2 className="subtitle">Loading…</h2>}
      {contracts?.data && (
        <table className="table">
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

export default TreasuryPage;
