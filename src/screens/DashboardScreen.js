import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  useIsLoading,
  useOwnFormattedName,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import SendButton from '../features/send/SendButton';
import TradeButton from '../features/send/TradeButton';
import { MODE_REQUEST, MODE_TRADE } from '../features/send/TradeModal';

function DashboardScreen({ children }) {
  const tokenizedApi = useTokenizedApi();
  const isLoading = useIsLoading();
  const ownFormattedName = useOwnFormattedName();

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
                />
              </span>
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <TradeButton mode={MODE_REQUEST}>
                <FormattedMessage
                  defaultMessage="Request"
                  description="Label for button to open dialog to request instruments"
                />
              </TradeButton>
            </div>
            <div className="navbar-item">
              <TradeButton mode={MODE_TRADE}>
                <FormattedMessage
                  defaultMessage="Trade"
                  description="Label for button to open dialog to trade instruments"
                />
              </TradeButton>
            </div>
            <div className="navbar-item">
              <SendButton />
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
                </div>
                <hr className="navbar-divider" />
                <a className="navbar-item" onClick={onLogOut}>
                  <span className="icon">
                    <i className="fas fa-sign-out-alt"></i>
                  </span>
                  <span>
                    <FormattedMessage
                      defaultMessage="Sign out"
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
