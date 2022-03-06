import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  useIsLoading,
  useOwnFormattedName,
  usePrimaryVault,
  useCashTotal,
  InstrumentAmount,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import SendButton from '../features/send/SendButton';

function DashboardScreen({ children }) {
  const tokenizedApi = useTokenizedApi();
  const isLoading = useIsLoading();
  const ownFormattedName = useOwnFormattedName();

  const logOut = () => {
    tokenizedApi.account.logOut();
  };

  const vaultId = usePrimaryVault()?.id;
  const cashTotal = useCashTotal(vaultId);

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
              {!!cashTotal?.amount > 0 && (
                <span class="tags has-addons ml-2">
                  <span class="tag is-medium is-rounded is-white">
                    <FormattedMessage
                      defaultMessage="Cash"
                      description="Nav bar cash total label"
                    />
                  </span>
                  <span class="tag is-medium is-rounded is-info has-text-weight-semibold">
                    <InstrumentAmount instrument={cashTotal} />
                  </span>
                </span>
              )}
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
          </div>
          <div className="navbar-end">
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
                <a className="navbar-item" onClick={logOut}>
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
