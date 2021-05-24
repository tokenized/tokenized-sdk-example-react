/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  usePrimaryVaultId,
  useFilteredBalances,
  useCurrentProfileDisplayCurrency,
} from '@tokenized/sdk-react-private';
import { setCurrentFilter } from './treasurySlice';
import BalanceRow from './BalanceRow';

function TreasuryAssetsTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentFilter('assets'));
  }, [dispatch]);

  const vaultId = usePrimaryVaultId();
  const displayCurrencyCode = useCurrentProfileDisplayCurrency();
  const balances = useFilteredBalances(vaultId, {
    includeLiabilities: false,
    includeInactive: false,
    displayCurrencyCode,
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

export default TreasuryAssetsTable;
