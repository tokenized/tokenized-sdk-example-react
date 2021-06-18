import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTokenizedApi } from '@tokenized/sdk-react-private';

function BackUpSeedPhrase() {
  const tokenizedApi = useTokenizedApi();

  const onCancelSignIn = useCallback(() => {
    tokenizedApi.account.logOut();
  }, [tokenizedApi]);
  const onIgnore = useCallback(
    () => tokenizedApi.account.skipSeedPhraseBackup(),
    [tokenizedApi.account],
  );

  return (
    <div className="box">
      <article className="message is-info">
        <div className="message-header">
          <p>
            <FormattedMessage
              defaultMessage="Record your recovery seed phrase"
              description="Back up seed phrase description title"
              id="GbM/e6"
            />
          </p>
        </div>
        <div className="message-body">
          <FormattedMessage
            defaultMessage="If you forget your passphrase, you will need this special 24-word “recovery seed” to restore full access to your profile and treasury assets. Be sure to keep at least one paper copy in a private and secure location."
            description="Back up seed phrase description"
            id="g3Jws1"
          />
        </div>
      </article>
      <div className="buttons is-right mt-6">
        <button
          type="button"
          onClick={onCancelSignIn}
          className="button is-light"
        >
          <FormattedMessage
            defaultMessage="Cancel"
            description="Back up seed phrase cancel button"
            id="Qi6Vpw"
          />
        </button>
        <button
          type="button"
          onClick={onIgnore}
          className="button is-danger is-light"
        >
          <FormattedMessage
            defaultMessage="Later…"
            description="Back up seed phrase later button"
            id="UIi3Ix"
          />
        </button>
        <button type="submit" className="button is-primary" disabled>
          <FormattedMessage
            defaultMessage="Show phrase"
            description="Back up seed phrase confirm button"
            id="l1Zi41"
          />
        </button>
      </div>
    </div>
  );
}

export default BackUpSeedPhrase;
