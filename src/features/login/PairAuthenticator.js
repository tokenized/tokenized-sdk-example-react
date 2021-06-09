import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  useTokenizedApi,
  DevicePairingCode,
  useOwnFormattedName,
} from '@tokenized/sdk-react-private';

function PairAuthenticator() {
  const tokenizedApi = useTokenizedApi();
  const ownFormattedName = useOwnFormattedName();

  const onCancelSignIn = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);

  return (
    <section className="box hero is-warning">
      <div className="hero-body">
        <div className="is-flex is-justify-content-center">
          <DevicePairingCode />
        </div>
        <p className="title has-text-centered mt-5">
          <FormattedMessage
            description="Login screen mobile authenticator pairing title"
            defaultMessage="Pair with authenticator"
            id="fFr3qj"
          />
        </p>
        <p className="subtitle has-text-centered">
          <FormattedMessage
            description="Login screen mobile authenticator pairing subtitle"
            defaultMessage="Scan this code in the Tokenized authenticator app to pair with account {fullName} and approve sign in"
            id="C6Pp9+"
            values={{ fullName: ownFormattedName }}
          />
        </p>
        <div className="buttons is-centered">
          <button onClick={onCancelSignIn} className="button is-light">
            <FormattedMessage
              description="Login screen cancel button"
              defaultMessage="Cancel"
              id="GCPZxk"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PairAuthenticator;