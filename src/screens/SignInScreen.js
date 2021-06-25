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
  useIsLoggingIn,
  useLogInNeedsVerifyEmail,
  useIsWaitingForDevicePairing,
  useLogInNeedsMfa,
  useLogInNeedsRestoreRootKey,
  useLogInNeedsSeedPhraseBackup,
  useIsLoggedIn,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import LogInProgress from '../features/login/LogInProgress';
import AccountVerification from '../features/login/AccountVerification';
import CredentialsForm from '../features/login/CredentialsForm';
import PairAuthenticator from '../features/login/PairAuthenticator';
import WaitForMFA from '../features/login/WaitForMFA';
import BackUpSeedPhrase from '../features/login/BackUpSeedPhrase';
import SeedPhraseRecovery from '../features/login/SeedPhraseRecovery';

function SignInScreen() {
  const location = useLocation();
  const { path } = useRouteMatch();
  const isLoading = useIsLoading();
  const isSigningIn = useIsLoggingIn();
  const showVerifyAccount = useLogInNeedsVerifyEmail();
  const showPairingCode = useIsWaitingForDevicePairing();
  const showMfaPrompt = useLogInNeedsMfa();
  const showRecovery = useLogInNeedsRestoreRootKey();
  const showBackup = useLogInNeedsSeedPhraseBackup();
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
  let SignInProcessComponent = null;
  if (isSigningIn) {
    SignInProcessComponent = LogInProgress;
    if (showVerifyAccount) {
      SignInProcessComponent = AccountVerification;
    }
    if (showPairingCode) {
      SignInProcessComponent = PairAuthenticator;
    }
    if (showMfaPrompt) {
      SignInProcessComponent = WaitForMFA;
    }
    if (showBackup) {
      SignInProcessComponent = BackUpSeedPhrase;
    }
    if (showRecovery) {
      SignInProcessComponent = SeedPhraseRecovery;
    }
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
              {isSigningIn ? (
                <FormattedMessage
                  defaultMessage="Signing in to your account…"
                  description="Sign in screen in progress subtitle"
                  id="H84siG"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Please sign in with your Tokenized account credentials"
                  description="Sign in screen ready subtitle"
                  id="YrL2I7"
                />
              )}
            </p>
          </div>
          {!isSigningIn && (
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
          {isSigningIn && <SignInProcessComponent />}
          {!isSigningIn && (
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
