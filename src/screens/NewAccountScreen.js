import React, { useState, useCallback } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {
  useTokenizedApi,
  useIsLoading,
  useIsLoggedIn,
} from '@tokenized/sdk-react-private';
import LoadingScreen from './LoadingScreen';
import NewAccountNames from '../features/new-account/NewAccountNames';
import NewAccountPassphrase from '../features/new-account/NewAccountPassphrase';

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
          try {
            await tokenizedApi.account.createNewAccount(values);
          } catch (error) {
            return { [FORM_ERROR]: error };
          }
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
                defaultMessage="Tokenized SDK demo"
                description="New account screen title"
                id="iA3+G9"
              />
            </h1>
            <p className="subtitle">
              <FormattedMessage
                defaultMessage="Create a new account"
                description="New account screen subtitle"
                id="RAmj2a"
              />
            </p>
          </div>
          <Form onSubmit={onSubmit}>
            {(formProps) => <FormPage {...formProps} />}
          </Form>
          {step === 'namesEmailHandle' && (
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
                  description="New account screen back to sign in link"
                  id="ETFPN0"
                />
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewAccountScreen;
