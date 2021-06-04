import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  useIsLoading,
  useLogInNeedsMfa,
  useIsWaitingForDevicePairing,
  useIsLoggedIn,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import CredentialsForm from '../features/login/CredentialsForm';
import PairAuthenticator from '../features/login/PairAuthenticator';
import WaitForMFA from '../features/login/WaitForMFA';

function LoginScreen() {
  const location = useLocation();
  const isLoading = useIsLoading();
  const needsMfa = useLogInNeedsMfa();
  const showPairingCode = useIsWaitingForDevicePairing();
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
                description="Login screen title"
                defaultMessage="Tokenized SDK demo"
                id="BWwoyB"
              />
            </h1>
            <p className="subtitle">
              <FormattedMessage
                description="Login screen subtitle"
                defaultMessage="Please sign in with your Tokenized account credentials"
                id="vaZlef"
              />
            </p>
          </div>
          {!(needsMfa || showPairingCode) && <CredentialsForm />}
          {needsMfa && !showPairingCode && <WaitForMFA />}
          {showPairingCode && <PairAuthenticator />}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
