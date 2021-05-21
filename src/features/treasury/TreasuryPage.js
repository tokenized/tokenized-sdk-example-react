/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  usePrimaryVaultId,
  useVaultName,
  useFilteredBalances,
} from '@tokenized/sdk-react-private';
import TreasuryAssetsTable from './TreasuryAssetsTable';
import TreasuryLiabilitiesTable from './TreasuryLiabilitiesTable';
import TreasuryInactiveTable from './TreasuryInactiveTable';
import { selectTreasuryCurrentFilter } from './treasurySlice';

function TreasuryPage() {
  const { url, path } = useRouteMatch();
  const vaultId = usePrimaryVaultId();
  const vaultName = useVaultName(vaultId);
  const assetsCount =
    useFilteredBalances(vaultId, {
      includeLiabilities: false,
      includeInactive: false,
    })?.data?.length || 0;
  const liabilitiesCount =
    useFilteredBalances(vaultId, {
      includeLiabilities: true,
      includeInactive: false,
    })?.data?.length || 0;
  const inactiveCount =
    useFilteredBalances(vaultId, {
      includeInactive: true,
    })?.data?.length || 0;

  const currentFilter = useSelector(selectTreasuryCurrentFilter);

  return (
    <section className="section">
      <h1 className="title">
        {vaultName || 'Treasury'}
        <span className="tag is-info ml-4">Primary vault</span>
      </h1>
      <div className="buttons has-addons">
        <NavLink
          to={`${url}/assets`}
          className="button"
          activeClassName="is-link is-selected"
        >
          <span>Assets</span>
          <span className="tag is-link is-light is-rounded ml-2">
            {assetsCount}
          </span>
        </NavLink>
        <NavLink
          to={`${url}/liabilities`}
          className="button"
          activeClassName="is-link is-selected"
        >
          <span>Liabilities</span>
          <span className="tag is-link is-light is-rounded ml-2">
            {liabilitiesCount}
          </span>
        </NavLink>
        <NavLink
          to={`${url}/inactive`}
          className="button"
          activeClassName="is-link is-selected"
        >
          <span>Inactive</span>
          <span className="tag is-link is-light is-rounded ml-2">
            {inactiveCount}
          </span>
        </NavLink>
      </div>
      <Switch>
        <Route path={`${path}/assets`}>
          <TreasuryAssetsTable />
        </Route>
        <Route path={`${path}/liabilities`}>
          <TreasuryLiabilitiesTable />
        </Route>
        <Route path={`${path}/inactive`}>
          <TreasuryInactiveTable />
        </Route>
        <Route path="*">
          <Redirect to={`${path}/${currentFilter || 'assets'}`} />
        </Route>
      </Switch>
    </section>
  );
}

export default TreasuryPage;
