/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  usePrimaryVaultId,
  useVaultName,
  useBalances,
} from '@tokenized/sdk-react-private';
import BalanceRow from '../tableRows/BalanceRow';

function TreasuryPage() {
  const vaultId = usePrimaryVaultId();
  const vaultName = useVaultName(vaultId);
  const balances = useBalances(vaultId);

  return (
    <section className="section">
      <h1 className="title">
        {vaultName || 'Treasury'}&nbsp;&nbsp;
        <span className="tag is-info">Primary vault</span>
      </h1>
      {balances?.isLoading && (
        <progress className="progress is-small is-primary" max="100" />
      )}
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
