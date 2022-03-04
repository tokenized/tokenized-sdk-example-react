import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFilteredBalances } from '@tokenized/sdk-react-private';
import { setCurrentFilter } from './treasurySlice';
import BalanceRow, { BalanceHeader } from './BalanceRow';

function TreasuryLiabilitiesTable({ vaultId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentFilter('liabilities'));
  }, [dispatch]);

  const balances = useFilteredBalances({
    vaultId,
    includeLiabilities: true,
    includeInactive: false,
  });

  if (balances?.isLoading) {
    return <progress className="progress is-small is-primary mt-5" max="100" />;
  }
  return (
    <div className="table-container">
      <table className="table is-hoverable">
        <thead>
          <BalanceHeader />
        </thead>
        <tbody>
          {balances?.data?.map?.((balance) => (
            <BalanceRow key={balance.instrumentId} balance={balance} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TreasuryLiabilitiesTable;
