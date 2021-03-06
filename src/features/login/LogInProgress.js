import React, { useCallback } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import {
  useTokenizedApi,
  useLogInProgress,
  useOwnFormattedName,
} from '@tokenized/sdk-react-private';

const logInProgressMessages = defineMessages({
  email: {
    defaultMessage: 'Checking account',
    description: 'Log-in status: Checking email verification',
  },
  credentials: {
    defaultMessage: 'Checking credentials',
    description: 'Log-in status: Checking credentials',
  },
  authenticator: {
    defaultMessage: 'Checking for paired authenticator',
    description: 'Log-in status: Checking for paired authenticator',
  },
  mfa: {
    defaultMessage: 'Confirm your identity in the authenticator app',
    description: 'Log-in status: waiting for MFA',
  },
  keysAndVault: {
    defaultMessage: 'Checking vault and signing keys',
    description: 'Log-in status: Checking vault and signing keys',
  },
  backup: {
    defaultMessage: 'Checking seed phrase has been recorded',
    description: 'Log-in status: Checking seed phrase backup',
  },
});

function LogInProgress() {
  const tokenizedApi = useTokenizedApi();
  const progress = useLogInProgress();
  const ownFormattedName = useOwnFormattedName();

  const onCancelSignIn = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);

  const progressPercent = progress?.percent || 0;
  const progressMessage = logInProgressMessages[progress?.checking];

  return (
    <section className="box hero is-warning">
      <div className="hero-body">
        <p className="title">
          <FormattedMessage
            defaultMessage="Welcome {name}"
            description="Log-in screen progress title"
            values={{ name: ownFormattedName }}
          />
        </p>
        <progress
          className="progress is-small is-primary"
          value={progressPercent}
          max="100"
        >
          {progressPercent}%
        </progress>
        {progressMessage && (
          <p className="subtitle">
            <FormattedMessage {...progressMessage} />
          </p>
        )}
        <div className="buttons">
          <button
            type="button"
            onClick={onCancelSignIn}
            className="button is-light"
          >
            <FormattedMessage
              description="Login screen cancel button"
              defaultMessage="Cancel"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default LogInProgress;
