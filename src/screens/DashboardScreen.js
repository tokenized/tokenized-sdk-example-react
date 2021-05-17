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
import ContractsPage from '../pages/ContractsPage';

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

  const [currentPage, setCurrentPage] = useState('treasury');
  const onSelectActivity = useCallback(() => setCurrentPage('activity'), []);
  const onSelectTreasury = useCallback(() => setCurrentPage('treasury'), []);
  const onSelectContracts = useCallback(() => setCurrentPage('contracts'), []);
  const onSelectRelationships = useCallback(
    () => setCurrentPage('relationships'),
    [],
  );

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
            <a
              className={classNames(
                'navbar-item',
                currentPage === 'activity' && ['is-tab', 'is-active'],
              )}
              onClick={onSelectActivity}
            >
              <span>Activity</span>
            </a>
            <a
              className={classNames(
                'navbar-item',
                currentPage === 'treasury' && ['is-tab', 'is-active'],
              )}
              onClick={onSelectTreasury}
            >
              <span>Treasury</span>
            </a>
            <a
              className={classNames(
                'navbar-item',
                currentPage === 'contracts' && ['is-tab', 'is-active'],
              )}
              onClick={onSelectContracts}
            >
              <span>Contracts</span>
            </a>
            <a
              className={classNames(
                'navbar-item',
                currentPage === 'relationships' && ['is-tab', 'is-active'],
              )}
              onClick={onSelectRelationships}
            >
              <span>Relationships</span>
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
      {currentPage === 'contracts' && <ContractsPage />}
    </div>
  );
}

export default DashboardScreen;
