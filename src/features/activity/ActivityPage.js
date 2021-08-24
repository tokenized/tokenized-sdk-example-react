import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { useActivity } from '@tokenized/sdk-react-private';
import NavTab from '../../utils/NavTab';
import ActivityTable from './ActivityTable';

export default function ActivityPage() {
  const { url, path } = useRouteMatch();

  const openCount =
    useActivity({
      includeSuccessfulEvents: false,
      includeIncompleteEvents: false,
      includeFailedEvents: false,
      includeExpiredEvents: false,
      includeEventsRequiringAction: true,
      includeEventsPendingOthers: false,
    })?.data?.length || 0;
  const pendingCount =
    useActivity({
      includeSuccessfulEvents: false,
      includeIncompleteEvents: false,
      includeFailedEvents: false,
      includeExpiredEvents: false,
      includeEventsRequiringAction: false,
      includeEventsPendingOthers: true,
    })?.data?.length || 0;

  return (
    <section className="section">
      <h1 className="title">
        <FormattedMessage
          defaultMessage="Activity"
          description="Activity page title"
        />
      </h1>
      <div className="tabs is-boxed">
        <ul>
          <NavTab to={`${url}/history`}>
            <span className="icon is-small">
              <i className="fas fa-history" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="History"
                description="All activity tab"
              />
            </span>
          </NavTab>
          <NavTab to={`${url}/open`}>
            <span className="icon is-small">
              <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="My open items"
                description="All activity tab"
              />
            </span>
            <span className="tag is-link is-light is-rounded ml-2">
              <FormattedNumber value={openCount} />
            </span>
          </NavTab>
          <NavTab to={`${url}/pending`}>
            <span className="icon is-small">
              <i className="fas fa-pause-circle" aria-hidden="true"></i>
            </span>
            <span>
              <FormattedMessage
                defaultMessage="Pending others"
                description="All activity tab"
              />
            </span>
            <span className="tag is-link is-light is-rounded ml-2">
              <FormattedNumber value={pendingCount} />
            </span>
          </NavTab>
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/history`}>
          <ActivityTable type="history" />
        </Route>
        <Route path={`${path}/open`}>
          <ActivityTable type="open" />
        </Route>
        <Route path={`${path}/pending`}>
          <ActivityTable type="pending" />
        </Route>
        <Route path="*">
          <Redirect to={`${path}/history`} />
        </Route>
      </Switch>
    </section>
  );
}
