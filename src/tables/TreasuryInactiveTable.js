/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  usePrimaryVaultId,
  useFilteredBalances,
} from '@tokenized/sdk-react-private';
import BalanceRow from '../tableRows/BalanceRow';

function TreasuryInactiveTable() {
  const vaultId = usePrimaryVaultId();
  const balances = useFilteredBalances(vaultId, { includeInactive: true });

  if (balances?.isLoading) {
    return <progress className="progress is-small is-primary" max="100" />;
  }
  return (
    <table className="table is-hoverable">
      <thead>
        <BalanceRow isHeader />
      </thead>
      <tbody>
        {balances?.data?.map?.((balance) => (
          <BalanceRow key={balance.assetId} balance={balance} />
        ))}
      </tbody>
    </table>
  );
}

export default TreasuryInactiveTable;
