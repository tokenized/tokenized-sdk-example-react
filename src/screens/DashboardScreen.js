/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import {
  useTokenizedApi,
  useIsLoading,
  useOwnFullName,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import TreasuryPage from '../pages/TreasuryPage';

function DashboardScreen() {
  const tokenizedApi = useTokenizedApi();
  const isLoading = useIsLoading();
  const fullName = useOwnFullName();

  const onLogOut = useCallback(
    (event) => {
      tokenizedApi.logout();
    },
    [tokenizedApi],
  );

  const [currentPage] = useState('treasury');

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <nav
        className="navbar is-dark"
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
        <div id="navbar" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              <span
                className={classNames(
                  currentPage === 'activity' && ['tag', 'is-medium', 'is-link'],
                )}
              >
                Activity
              </span>
            </a>
            <a className="navbar-item">
              <span
                className={classNames(
                  currentPage === 'treasury' && ['tag', 'is-medium', 'is-link'],
                )}
              >
                Treasury
              </span>
            </a>
            <a className="navbar-item">
              <span
                className={classNames(
                  currentPage === 'contracts' && [
                    'tag',
                    'is-medium',
                    'is-link',
                  ],
                )}
              >
                Contracts
              </span>
            </a>
            <a className="navbar-item">
              <span
                className={classNames(
                  currentPage === 'relationships' && [
                    'tag',
                    'is-medium',
                    'is-link',
                  ],
                )}
              >
                Relationships
              </span>
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary" onClick={onLogOut}>
                  <strong>Sign out</strong>&nbsp;{fullName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {currentPage === 'treasury' && <TreasuryPage />}
    </div>
  );
}

export default DashboardScreen;
