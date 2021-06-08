import React from 'react';
import {
  Link,
  Redirect,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
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

function SignInScreen() {
  const location = useLocation();
  const { path } = useRouteMatch();
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
                description="Sign in screen title"
                defaultMessage="Tokenized SDK demo"
                id="GbFjMQ"
              />
            </h1>
            <p className="subtitle">
              <FormattedMessage
                description="Sign in screen subtitle"
                defaultMessage="Please sign in with your Tokenized account credentials"
                id="nUTL2v"
              />
            </p>
          </div>
          {!(needsMfa || showPairingCode) && (
            <Switch>
              <Route path={`${path}/handle`}>
                <CredentialsForm identifierType="handle" />
              </Route>
              <Route path={`${path}/email`}>
                <CredentialsForm identifierType="email" />
              </Route>
              <Route path={`${path}/phone-number`}>
                <CredentialsForm identifierType="phoneNumber" />
              </Route>
              <Route path="*">
                <Redirect to={`${path}/handle`} />
              </Route>
            </Switch>
          )}
          {needsMfa && !showPairingCode && <WaitForMFA />}
          {showPairingCode && <PairAuthenticator />}
          {!(needsMfa || showPairingCode) && (
            <section className="section has-text-centered">
              <Link
                to={{
                  pathname: '/new-account',
                  state: location?.state,
                }}
                className="button is-link is-light"
              >
                <FormattedMessage
                  defaultMessage="Create a new account…"
                  id="w00rFA"
                  description="Sign in screen create new account link"
                />
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
