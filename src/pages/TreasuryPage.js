/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { usePrimaryBalances } from '@tokenized/sdk-react-private';
import BalanceRow from '../tableRows/BalanceRow';

function TreasuryPage() {
  const balances = usePrimaryBalances();

  return (
    <section className="section">
      <h1 className="title">Primary vault</h1>
      {balances?.isLoading && <h2 className="subtitle">Loading…</h2>}
      {balances?.data && (
        <table className="table">
          <thead>
            <BalanceRow isHeader />
          </thead>
          <tbody>
            {balances.data.map((balance) => (
              <BalanceRow key={balance.assetId} balance={balance} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TreasuryPage;
