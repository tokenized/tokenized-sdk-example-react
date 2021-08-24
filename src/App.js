import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useIsLoggedIn } from '@tokenized/sdk-react-private';
import SignInScreen from './screens/SignInScreen';
import NewAccountScreen from './screens/NewAccountScreen';
import ResetPassphraseScreen from './screens/ResetPassphraseScreen';
import DashboardScreen from './screens/DashboardScreen';
import TreasuryPage from './features/treasury/TreasuryPage';
import ContractsPage from './features/contracts/ContractsPage';
import ActivityPage from './features/activity/ActivityPage';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated
function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useIsLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const intl = useIntl();
  useEffect(() => {
    document.title = intl.formatMessage({
      description: 'The app’s browser page title',
      defaultMessage: 'Tokenized SDK demo',
    });
  }, [intl]);

  return (
    <Router>
      <Switch>
        <Route path="/sign-in">
          <SignInScreen />
        </Route>
        <Route path="/new-account">
          <NewAccountScreen />
        </Route>
        <Route path="/forgot">
          <ResetPassphraseScreen />
        </Route>
        <PrivateRoute path="/activity">
          <DashboardScreen>
            <ActivityPage />
          </DashboardScreen>
        </PrivateRoute>
        <PrivateRoute path="/treasury">
          <DashboardScreen>
            <TreasuryPage />
          </DashboardScreen>
        </PrivateRoute>
        <PrivateRoute path="/contracts">
          <DashboardScreen>
            <ContractsPage />
          </DashboardScreen>
        </PrivateRoute>
        <PrivateRoute path="/relationships">
          <DashboardScreen />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/activity" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
