import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
  return (
    <Router>
      <Switch>
        <Route path="/login">
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
