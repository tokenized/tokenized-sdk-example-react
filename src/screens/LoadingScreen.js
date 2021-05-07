import React from 'react';

function LoadingScreen() {
  return (
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half has-text-centered">
              <h1 className="title">Loading…</h1>
              <progress className="progress is-small is-primary" max="100" />
              <p className="subtitle">Checking for previous session</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoadingScreen;
