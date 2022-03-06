import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import {
  usePrimaryVault,
  useFilteredBalances,
  useAssetsTotal,
  useLiabilitiesTotal,
  useNetEquity,
  InstrumentAmount,
} from '@tokenized/sdk-react-private';
import NavTab from '../../utils/NavTab';
import TreasuryAssetsTable from './TreasuryAssetsTable';
import TreasuryLiabilitiesTable from './TreasuryLiabilitiesTable';
import TreasuryInactiveTable from './TreasuryInactiveTable';
import { selectTreasuryCurrentFilter } from './treasurySlice';

function TreasuryPage() {
  const { url, path } = useRouteMatch();
  const vault = usePrimaryVault();
  const vaultId = vault?.id;

  const assetsTotal = useAssetsTotal(vaultId);
  const liabilitiesTotal = useLiabilitiesTotal(vaultId);
  const netEquity = useNetEquity(vaultId);

  const assetsCount =
    useFilteredBalances({
      vaultId,
      includeLiabilities: false,
      includeInactive: false,
    })?.data?.length || 0;
  const liabilitiesCount =
    useFilteredBalances({
      vaultId,
      includeLiabilities: true,
      includeInactive: false,
    })?.data?.length || 0;
  const inactiveCount =
    useFilteredBalances({
      vaultId,
      includeInactive: true,
    })?.data?.length || 0;

  const currentFilter = useSelector(selectTreasuryCurrentFilter);

  return (
    <section className="section">
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="tile is-child notification is-success">
            <p className="title">
              <InstrumentAmount instrument={assetsTotal} />
            </p>
            <p className="subtitle">
              <FormattedMessage
                defaultMessage="Total assets"
                description="Treasury totals label"
              />
            </p>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child notification is-warning">
            <p className="title">
              <InstrumentAmount instrument={liabilitiesTotal} />
            </p>
            <p className="subtitle">
              <FormattedMessage
                defaultMessage="Total liabilities"
                description="Treasury totals label"
              />
            </p>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child notification is-info">
            <p className="title">
              <InstrumentAmount instrument={netEquity} />
            </p>
            <p className="subtitle">
              <FormattedMessage
                defaultMessage="Net equity"
                description="Treasury totals label"
              />
            </p>
          </div>
        </div>
      </div>
      <div className="tabs is-boxed">
        <ul>
          <NavTab to={`${url}/assets`}>
            <span className="icon is-small">
              <i className="fas fa-folder-plus" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="Assets"
                description="Treasury assets tab"
              />
              <span className="tag is-link is-light is-rounded ml-2">
                <FormattedNumber value={assetsCount} />
              </span>
            </span>
          </NavTab>
          <NavTab to={`${url}/liabilities`}>
            <span className="icon is-small">
              <i className="fas fa-folder-minus" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="Liabilities"
                description="Treasury liabilities tab"
              />
            </span>
            <span className="tag is-link is-light is-rounded ml-2">
              <FormattedNumber value={liabilitiesCount} />
            </span>
          </NavTab>
          <NavTab to={`${url}/inactive`}>
            <span className="icon is-small">
              <i className="fas fa-ban" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="Inactive"
                description="Treasury inactive tab"
              />
            </span>
            <span className="tag is-link is-light is-rounded ml-2">
              <FormattedNumber value={inactiveCount} />
            </span>
          </NavTab>
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/assets`}>
          <TreasuryAssetsTable vaultId={vaultId} />
        </Route>
        <Route path={`${path}/liabilities`}>
          <TreasuryLiabilitiesTable vaultId={vaultId} />
        </Route>
        <Route path={`${path}/inactive`}>
          <TreasuryInactiveTable vaultId={vaultId} />
        </Route>
        <Route path="*">
          <Redirect to={`${path}/${currentFilter || 'assets'}`} />
        </Route>
      </Switch>
    </section>
  );
}

export default TreasuryPage;
