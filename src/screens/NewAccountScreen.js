import React, { useState, useCallback } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-final-form';
import {
  useTokenizedApi,
  useIsLoading,
  useIsLoggedIn,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import NewAccountNames from '../features/new-account/NewAccountNames';
import NewAccountPassphrase from '../features/new-account/NewAccountPassphrase';
import NewAccountVerification from '../features/new-account/NewAccountVerification';

function NewAccountScreen() {
  const location = useLocation();
  const history = useHistory();
  const isLoading = useIsLoading();
  const isLoggedIn = useIsLoggedIn();
  const tokenizedApi = useTokenizedApi();

  const [step, setStep] = useState('namesEmailHandle');
  const onSubmit = useCallback(
    async (values, form) => {
      switch (step) {
        case 'namesEmailHandle':
          setStep('passphrase');
          break;
        case 'passphrase':
          await tokenizedApi.account.createNewAccount(values);
          setStep('verificationCode');
          break;
        case 'verificationCode':
          await tokenizedApi.account.verifyNewAccount(values);
          history.push('/sign-in', location?.state);
          break;
        default:
          setStep('namesEmailHandle');
          form.restart();
          break;
      }
    },
    [history, location?.state, step, tokenizedApi.account],
  );

  let FormPage;
  switch (step) {
    case 'namesEmailHandle':
    default:
      FormPage = NewAccountNames;
      break;
    case 'passphrase':
      FormPage = NewAccountPassphrase;
      break;
    case 'verificationCode':
      FormPage = NewAccountVerification;
      break;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isLoggedIn) {
    let originalLocation = '/';
    if (
      location?.state?.from &&
      location?.state?.from?.pathname !== location?.pathname
    ) {
      originalLocation = location?.state?.from;
    }
    return <Redirect to={originalLocation} />;
  }

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="has-text-centered my-6">
            <h1 className="title">
              <FormattedMessage
                description="New account screen title"
                defaultMessage="Tokenized SDK demo"
                id="iA3+G9"
              />
            </h1>
            <p className="subtitle">
              <FormattedMessage
                description="New account screen subtitle"
                defaultMessage="Create a new account"
                id="RAmj2a"
              />
            </p>
          </div>
          <Form onSubmit={onSubmit}>
            {(formProps) => <FormPage {...formProps} />}
          </Form>
          <section className="section has-text-centered">
            <Link
              to={{
                pathname: '/sign-in',
                state: location?.state,
              }}
              className="button is-link is-light"
            >
              <FormattedMessage
                defaultMessage="Sign in…"
                id="ETFPN0"
                description="New account screen back to sign in link"
              />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default NewAccountScreen;
