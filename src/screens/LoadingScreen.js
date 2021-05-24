import React from 'react';
import { FormattedMessage } from 'react-intl';

function LoadingScreen() {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half has-text-centered">
              <h1 className="title">
                <FormattedMessage
                  description="App loading screen title"
                  defaultMessage="Loading…"
                  id="CYyLJH"
                />
              </h1>
              <progress className="progress is-small is-primary" max="100" />
              <p className="subtitle">
                <FormattedMessage
                  description="App loading screen subtitle (below animated progress bar)"
                  defaultMessage="Checking for previous session"
                  id="slLQlj"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoadingScreen;
