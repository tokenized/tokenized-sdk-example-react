import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIsLoading, useIsLoggedIn } from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import ForgotPassphrase from '../features/login/ForgotPassphrase';

function ResetPassphraseScreen() {
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
                defaultMessage="Tokenized SDK demo"
                description="Reset passphrase screen title"
              />
            </h1>
            <p className="subtitle">
              <FormattedMessage
                defaultMessage="Reset your passphrase"
                description="Reset passphrase screen subtitle"
              />
            </p>
          </div>
          <ForgotPassphrase />
        </div>
      </div>
    </div>
  );
}

export default ResetPassphraseScreen;
