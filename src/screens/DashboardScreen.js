import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  useIsLoading,
  useOwnFormattedName,
  useCurrentProfileName,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import SendButton from '../features/send/SendButton';

function DashboardScreen({ children }) {
  const tokenizedApi = useTokenizedApi();
  const isLoading = useIsLoading();
  const ownFormattedName = useOwnFormattedName();
  const profileName = useCurrentProfileName();

  const onLogOut = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <strong className="navbar-item">
            <FormattedMessage
              description="Nav bar main title"
              defaultMessage="Tokenized SDK demo"
              id="PVFFBa"
            />
          </strong>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbar" className="navbar-menu is-active">
          <div className="navbar-start">
            <NavLink
              to="/activity"
              className="navbar-item"
              activeClassName="is-tab is-active"
            >
              <span>
                <FormattedMessage
                  description="Nav bar activity tab"
                  defaultMessage="Activity"
                  id="iuWj8R"
                />
              </span>
            </NavLink>
            <NavLink
              to="/treasury"
              className="navbar-item"
              activeClassName="is-tab is-active"
            >
              <span>
                <FormattedMessage
                  description="Nav bar treasury tab"
                  defaultMessage="Treasury"
                  id="Uq6/ag"
                />
              </span>
            </NavLink>
            <NavLink
              to="/contracts"
              className="navbar-item"
              activeClassName="is-tab is-active"
            >
              <span>
                <FormattedMessage
                  description="Nav bar contracts tab"
                  defaultMessage="Contracts"
                  id="FvzCUW"
                />
              </span>
            </NavLink>
            <NavLink
              to="/relationships"
              className="navbar-item"
              activeClassName="is-tab is-active"
            >
              <span>
                <FormattedMessage
                  description="Nav bar relationships tab"
                  defaultMessage="Relationships"
                  id="qZNWyi"
                />
              </span>
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <SendButton/>

            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
              </a>
              <div className="navbar-dropdown is-right">
                <div className="navbar-item">
                  <strong>{ownFormattedName}</strong>
                  {profileName && <span className="ml-2">{profileName}</span>}
                </div>
                <hr className="navbar-divider" />
                <a className="navbar-item" onClick={onLogOut}>
                  <span className="icon">
                    <i className="fas fa-sign-out-alt"></i>
                  </span>
                  <span>
                    <FormattedMessage
                      defaultMessage="Sign out"
                      id="a6TlyZ"
                      description="Nav bar user menu sign out action"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default DashboardScreen;
