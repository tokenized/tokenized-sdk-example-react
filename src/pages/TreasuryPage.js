/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import {
  usePrimaryVaultId,
  useVaultName,
  useFilteredBalances,
} from '@tokenized/sdk-react-private';
import TreasuryAssetsTable from '../tables/TreasuryAssetsTable';
import TreasuryLiabilitiesTable from '../tables/TreasuryLiabilitiesTable';
import TreasuryInactiveTable from '../tables/TreasuryInactiveTable';

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

  return (
    <section className="section">
      <h1 className="title">
        {vaultName || 'Treasury'}&nbsp;&nbsp;
        <span className="tag is-info">Primary vault</span>
      </h1>
      <div className="buttons has-addons">
        <NavLink
          to={`${url}/assets`}
          className="button"
          activeClassName="is-link is-selected"
        >
          <span>Assets&nbsp;&nbsp;</span>
          <span className="tag is-link is-light is-rounded">{assetsCount}</span>
        </NavLink>
        <NavLink
          to={`${url}/liabilities`}
          className="button"
          activeClassName="is-link is-selected"
        >
          <span>Liabilities&nbsp;&nbsp;</span>
          <span className="tag is-link is-light is-rounded">
            {liabilitiesCount}
          </span>
        </NavLink>
        <NavLink
          to={`${url}/inactive`}
          className="button"
          activeClassName="is-link is-selected"
        >
          <span>Inactive&nbsp;&nbsp;</span>
          <span className="tag is-link is-light is-rounded">
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
          <Redirect to={`${path}/assets`} />
        </Route>
      </Switch>
    </section>
  );
}

export default TreasuryPage;
