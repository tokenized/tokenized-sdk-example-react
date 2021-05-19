/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
  useTokenizedApi,
  useIsLoading,
  useOwnFullName,
  useCurrentProfileName,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';

function DashboardScreen({ children }) {
  const tokenizedApi = useTokenizedApi();
  const isLoading = useIsLoading();
  const fullName = useOwnFullName();
  const profileName = useCurrentProfileName();

  const onLogOut = useCallback(
    (event) => {
      tokenizedApi.logout();
    },
    [tokenizedApi],
  );

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
          <strong className="navbar-item">Tokenized SDK demo</strong>
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
              <span>Activity</span>
            </NavLink>
            <NavLink
              to="/treasury"
              className="navbar-item"
              activeClassName="is-tab is-active"
            >
              <span>Treasury</span>
            </NavLink>
            <NavLink
              to="/contracts"
              className="navbar-item"
              activeClassName="is-tab is-active"
            >
              <span>Contracts</span>
            </NavLink>
            <NavLink
              to="/relationships"
              className="navbar-item"
              activeClassName="is-tab is-active"
            >
              <span>Relationships</span>
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
              </a>
              <div className="navbar-dropdown is-right">
                <div className="navbar-item">
                  <strong>{fullName}</strong>
                  {profileName && <span>&nbsp;&nbsp;{profileName}</span>}
                </div>
                <hr className="navbar-divider" />
                <a className="navbar-item" onClick={onLogOut}>
                  <span className="icon">
                    <i className="fas fa-sign-out-alt"></i>
                  </span>
                  <span>Sign out</span>
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
