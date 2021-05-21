import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useIsLoggedIn } from '@tokenized/sdk-react-private';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import TreasuryPage from './pages/TreasuryPage';
import ContractsPage from './pages/ContractsPage';

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
              pathname: '/login',
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
      id: '6amK0i',
    });
  }, [intl]);

  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <LoginScreen />
        </Route>
        <PrivateRoute path="/activity">
          <DashboardScreen />
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
          <Redirect to="/treasury" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
