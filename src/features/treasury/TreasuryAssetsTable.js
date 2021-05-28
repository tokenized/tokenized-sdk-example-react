import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFilteredBalances } from '@tokenized/sdk-react-private';
import { setCurrentFilter } from './treasurySlice';
import BalanceRow from './BalanceRow';

function TreasuryAssetsTable({ vaultId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentFilter('assets'));
  }, [dispatch]);

  const balances = useFilteredBalances(vaultId, {
    includeLiabilities: false,
    includeInactive: false,
  });

  if (balances?.isLoading) {
    return <progress className="progress is-small is-primary mt-5" max="100" />;
  }
  return (
    <div className="table-container">
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
    </div>
  );
}

export default TreasuryAssetsTable;
