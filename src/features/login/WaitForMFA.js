import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  useOwnFormattedName,
} from '@tokenized/sdk-react-private';

function WaitForMFA() {
  const tokenizedApi = useTokenizedApi();
  const ownFormattedName = useOwnFormattedName();

  const onCancelSignIn = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);
  const onDisplayPairingCode = useCallback(() => {
    tokenizedApi.account.initiateDevicePairing();
  }, [tokenizedApi]);

  return (
    <section className="box hero is-warning">
      <div className="hero-body">
        <p className="title">
          <FormattedMessage
            description="Login screen mobile authentication prompt title"
            defaultMessage="Welcome {name}"
            values={{ name: ownFormattedName }}
          />
        </p>
        <progress className="progress is-small is-primary" max="100" />
        <p className="subtitle">
          <FormattedMessage
            description="Login screen mobile authentication prompt subtitle"
            defaultMessage="Please confirm your identity in the authenticator app"
          />
        </p>
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
          <button
            type="button"
            onClick={onDisplayPairingCode}
            className="button is-info is-light"
          >
            <FormattedMessage
              description="Login screen display pairing code button"
              defaultMessage="Display pairing code…"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default WaitForMFA;
