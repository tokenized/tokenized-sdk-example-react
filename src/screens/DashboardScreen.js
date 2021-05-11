import React, { useCallback } from 'react';
import {
  useTokenizedApi,
  useIsLoading,
  useUserFullName,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';

function DashboardScreen() {
  const tokenizedApi = useTokenizedApi();
  const isLoading = useIsLoading();
  const fullName = useUserFullName();

  const onLogOut = useCallback(
    (event) => {
      tokenizedApi.logout();
    },
    [tokenizedApi],
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="m-3">
      <article className="message is-success">
        <div className="message-header">
          <p>Success</p>
        </div>
        <div className="message-body">
          Welcome <strong>{fullName}</strong>. You have been successfully signed
          in to the Tokenized platform, and your wallet is unlocked and ready
          for use.
        </div>
      </article>
      <button type="button" className="button is-primary" onClick={onLogOut}>
        Sign out
      </button>
    </div>
  );
}

export default DashboardScreen;
