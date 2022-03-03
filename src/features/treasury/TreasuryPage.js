import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import {
  usePrimaryVault,
  useFilteredBalances,
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
  const vaultName = vault?.name;
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
      <h1 className="title">
        {vaultName || (
          <FormattedMessage
            defaultMessage="Treasury"
            description="Treasury page title (if no vault name)"
          />
        )}
        <span className="tag is-info ml-4">
          <FormattedMessage
            defaultMessage="Primary vault"
            description="Treasury primary vault tag"
          />
        </span>
      </h1>
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
