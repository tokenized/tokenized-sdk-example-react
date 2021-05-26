/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFilteredBalances } from '@tokenized/sdk-react-private';
import { setCurrentFilter } from './treasurySlice';
import BalanceRow from './BalanceRow';

function TreasuryInactiveTable({ vaultId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentFilter('inactive'));
  }, [dispatch]);

  const balances = useFilteredBalances(vaultId, {
    includeInactive: true,
  });

  if (balances?.isLoading) {
    return <progress className="progress is-small is-primary mt-5" max="100" />;
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
