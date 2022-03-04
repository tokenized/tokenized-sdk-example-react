import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { useContracts } from '@tokenized/sdk-react-private';
import NavTab from '../../utils/NavTab';
import ContractsTable from './ContractsTable';

export default function ContractsPage() {
  const { url, path } = useRouteMatch();

  const activeCount =
    useContracts({
      includeActiveContracts: true,
      includeDraftContracts: false,
      includeEndedContracts: false,
    })?.data?.length || 0;
  const draftsCount =
    useContracts({
      includeActiveContracts: false,
      includeDraftContracts: true,
      includeEndedContracts: false,
    })?.data?.length || 0;
  const endedCount =
    useContracts({
      includeActiveContracts: false,
      includeDraftContracts: false,
      includeEndedContracts: true,
    })?.data?.length || 0;

  return (
    <section className="section">
      <h1 className="title">
        <FormattedMessage
          defaultMessage="Contracts"
          description="Contracts page title"
        />
      </h1>
      <div className="tabs is-boxed">
        <ul>
          <NavTab to={`${url}/active`}>
            <span className="icon is-small">
              <i className="fas fa-play-circle" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="Active"
                description="Contracts tab"
              />
            </span>
            <span className="tag is-link is-light is-rounded ml-2">
              <FormattedNumber value={activeCount} />
            </span>
          </NavTab>
          <NavTab to={`${url}/drafts`}>
            <span className="icon is-small">
              <i className="fas fa-edit" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="Drafts"
                description="Contracts tab"
              />
            </span>
            <span className="tag is-link is-light is-rounded ml-2">
              <FormattedNumber value={draftsCount} />
            </span>
          </NavTab>
          <NavTab to={`${url}/ended`}>
            <span className="icon is-small">
              <i className="fas fa-ban" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="Ended"
                description="Contracts tab"
              />
            </span>
            <span className="tag is-link is-light is-rounded ml-2">
              <FormattedNumber value={endedCount} />
            </span>
          </NavTab>
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/active`}>
          <ContractsTable type="active" />
        </Route>
        <Route path={`${path}/drafts`}>
          <ContractsTable type="drafts" />
        </Route>
        <Route path={`${path}/ended`}>
          <ContractsTable type="ended" />
        </Route>
        <Route path="*">
          <Redirect to={`${path}/active`} />
        </Route>
      </Switch>
    </section>
  );
}
