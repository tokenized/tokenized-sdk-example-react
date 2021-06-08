import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIsLoading, useIsLoggedIn } from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import NewAccountNames from '../features/new-account/NewAccountNames';

function NewAccountScreen() {
  const location = useLocation();
  const isLoading = useIsLoading();
  const isLoggedIn = useIsLoggedIn();

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isLoggedIn) {
    let originalLocation = '/';
    if (
      location?.state?.from &&
      location?.state?.from?.pathname !== location?.pathname
    ) {
      originalLocation = location?.state?.from;
    }
    return <Redirect to={originalLocation} />;
  }

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="has-text-centered my-6">
            <h1 className="title">
              <FormattedMessage
                description="New account screen title"
                defaultMessage="Tokenized SDK demo"
                id="iA3+G9"
              />
            </h1>
            <p className="subtitle">
              <FormattedMessage
                description="New account screen subtitle"
                defaultMessage="Create a new account"
                id="RAmj2a"
              />
            </p>
          </div>
          <NewAccountNames />
          <section className="section has-text-centered">
            <Link
              to={{
                pathname: '/sign-in',
                state: location?.state,
              }}
              className="button is-link is-light"
            >
              <FormattedMessage
                defaultMessage="Sign in…"
                id="ETFPN0"
                description="New account screen back to sign in link"
              />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default NewAccountScreen;
