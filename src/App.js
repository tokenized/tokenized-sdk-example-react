import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useIsLoggedIn } from '@tokenized/sdk-js-private';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

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
        <PrivateRoute path="/dashboard">
          <DashboardScreen />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
