import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { useTokenizedApi, useIsLoggingIn } from '@tokenized/sdk-react-private';

function NewAccountNames() {
  const location = useLocation();
  const tokenizedApi = useTokenizedApi();
  const isLoggingIn = useIsLoggingIn();

  const [firstName, setFirstName] = useState('');
  const onFirstNameInput = useCallback(
    (event) => setFirstName(event.target.value),
    [setFirstName],
  );

  const [lastName, setLastName] = useState('');
  const onLastNameInput = useCallback(
    (event) => setLastName(event.target.value),
    [setLastName],
  );

  const [email, setEmail] = useState('');
  const onEmailInput = useCallback(
    (event) => setEmail(event.target.value),
    [setEmail],
  );

  const [handle, setHandle] = useState('');
  const onHandleInput = useCallback(
    (event) => setHandle(event.target.value),
    [setHandle],
  );
  const handlePostfix = tokenizedApi.account.getUserHandlePostfix();

  const onContinue = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className="box">
      <form onSubmit={onContinue}>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">
                <FormattedMessage
                  defaultMessage="First name"
                  description="Sign up input field label: first name"
                  id="YGFyva"
                />
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onInput={onFirstNameInput}
                />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">
                <FormattedMessage
                  defaultMessage="Last name"
                  description="Sign up input field label: last name"
                  id="MKs5lh"
                />
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onInput={onLastNameInput}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">
            <FormattedMessage
              defaultMessage="Personal email"
              description="Sign up input field label: email"
              id="cB1RHb"
            />
          </label>
          <div className="control">
            <input
              className="input"
              type="email"
              autoComplete="email"
              value={email}
              onInput={onEmailInput}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">
            <FormattedMessage
              defaultMessage="Paymail handle"
              description="Sign up input field label: handle"
              id="2oGVVt"
            />
          </label>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                autoComplete="username"
                value={handle}
                onInput={onHandleInput}
              />
            </div>
            <div className="control">
              <span className="button is-static">{handlePostfix}</span>
            </div>
          </div>
        </div>
        <div className="buttons is-right mt-6">
          <Link
            to={{
              pathname: '/sign-in',
              state: location?.state,
            }}
            className="button is-light"
          >
            <FormattedMessage
              defaultMessage="Cancel"
              id="QoOTpE"
              description="New account cancel button"
            />
          </Link>
          <button
            className={classNames(
              'button',
              'is-primary',
              isLoggingIn && 'is-loading',
            )}
            disabled={!!firstName && !!lastName && !!email && !!handle}
          >
            <FormattedMessage
              description="New account continue button"
              defaultMessage="Continue"
              id="7BgPWf"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAccountNames;
