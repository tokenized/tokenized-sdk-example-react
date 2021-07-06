import React from 'react';
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ActivityTable from './ActivityTable';

export default function ActivityPage() {
  const { url, path } = useRouteMatch();

  return (
    <section className="section">
      <h1 className="title">
        <FormattedMessage
          defaultMessage="Activity"
          description="Activity page title"
          id="IEpphI"
        />
      </h1>
      <div className="buttons has-addons">
        <NavLink
          to={`${url}/all`}
          className="button"
          activeClassName="is-link is-selected"
        >
          <span>
            <FormattedMessage
              defaultMessage="All"
              description="All activity tab"
              id="nIjgF+"
            />
          </span>
        </NavLink>
        <NavLink
          to={`${url}/pending`}
          className="button"
          activeClassName="is-link is-selected"
        >
          <span>
            <FormattedMessage
              defaultMessage="Pending"
              description="Pending activity tab"
              id="xFJvp5"
            />
          </span>
        </NavLink>
      </div>
      <Switch>
        <Route path={`${path}/all`}>
          <ActivityTable />
        </Route>
        <Route path={`${path}/pending`}>
          <ActivityTable pending />
        </Route>
        <Route path="*">
          <Redirect to={`${path}/all`} />
        </Route>
      </Switch>
    </section>
  );
}
