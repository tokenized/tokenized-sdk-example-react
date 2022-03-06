import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { OnChange } from 'react-final-form-listeners';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useTokenizedApi,
  usePrimaryVault,
  usePersonalProfile,
  useInstrumentWithDetails,
  useContact,
  InstrumentAmount,
} from '@tokenized/sdk-react-private';
import { fieldIsRequired, useValidators } from '../../utils/validators';
import SelectPaymail from './SelectPaymail';
import SelectInstrument from './SelectInstrument';
import InstrumentAmountFormField from './InstrumentAmountFormField';
import InputInstrumentMemo from './InputInstrumentMemo';

function SendShowConfirmation({ values: { amount, memo, recipient } }) {
  amount = useInstrumentWithDetails(amount);
  const contact = useContact(recipient);

  return (
    <section
      className="modal-card-body hero is-warning pt-6"
      // style={{ overflow: 'visible' }}
    >
      <p className="title">
        <InstrumentAmount instrument={amount} />
      </p>
      <p className="subtitle">
        <FormattedMessage
          defaultMessage="to {name}"
          description="Send instruments confirmation recipient (below amount and instrument)"
          values={{ name: contact?.displayName || recipient }}
        />
      </p>
      <p className="subtitle">
        <div className="has-text-weight-bold">
          {amount.formatInstrumentName()}
        </div>
        {!!memo && (
          <div>
            <FormattedMessage
              defaultMessage="“{memo}”"
              description="Send instruments confirmation memo in quotes"
              values={{ memo }}
            />
          </div>
        )}
      </p>
      <p className="subtitle mt-4">
        <FormattedMessage
          defaultMessage="Confirm the transfer with your authenticator app"
          description="Send instruments confirmation prompt subtitle"
        />
      </p>
      <progress className="progress is-small is-primary" max="100" />
    </section>
  );
}

const SendFormFields = ({ form, values: { instrumentId }, submitError }) => {
  const intl = useIntl();

  const validateRequired = useValidators(fieldIsRequired);

  return (
    <section className="modal-card-body" style={{ overflow: 'visible' }}>
      <h2 className="label">
        <FormattedMessage defaultMessage="Send" />
      </h2>
      <Field
        name="instrumentId"
        validate={validateRequired}
        render={SelectInstrument}
      />
      <OnChange name="instrumentId">
        {() => {
          form.change('amount', undefined);
          return null;
        }}
      </OnChange>
      <InstrumentAmountFormField name="amount" instrumentId={instrumentId} />
      <Field name="recipient" validate={validateRequired}>
        {({ ...props }) => (
          <SelectPaymail
            {...props}
            placeholder={intl.formatMessage({
              defaultMessage: 'Enter recipient’s handle',
              description: 'Placeholder for send recipient entry field',
            })}
          />
        )}
      </Field>
      <Field name="memo" render={InputInstrumentMemo} />
      {submitError && <div className="has-text-danger">{submitError}</div>}
    </section>
  );
};

export default function SendDialog({ close: closeDialog }) {
  const tokenizedApi = useTokenizedApi();
  const lockboxId = usePrimaryVault()?.primaryLockboxId;
  const profileId = usePersonalProfile()?.id;

  const [waitForMfa, setWaitForMfa] = useState(false);

  const close = () => {
    if (waitForMfa) {
      tokenizedApi.mfa.cancelMFA();
      closeDialog();
    }
  };

  const send = async (values) => {
    const sendOptions = {
      profileId,
      lockboxId,
      instrumentId: values.instrumentId,
      memo: values.memo,
      recipients: [
        {
          handle: values.recipient,
          amount: values.amount,
        },
      ],
    };
    setWaitForMfa(true);
    try {
      await tokenizedApi.transfers.send(sendOptions);
    } catch (error) {
      setWaitForMfa(false);
      console.error(error);
      return { [FORM_ERROR]: `${error}` };
    }
    setWaitForMfa(false);
    close();
  };

  return (
    <Form
      onSubmit={send}
      render={({
        form,
        handleSubmit,
        hasValidationErrors,
        submitting,
        values,
        submitError,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="modal is-active" style={{ overflow: 'visible ' }}>
            <div className="modal-background" onClick={close}></div>
            <div className="modal-card" style={{ overflow: 'visible ' }}>
              <header className="modal-card-head">
                <p className="modal-card-title">
                  <FormattedMessage defaultMessage="Send instruments" />
                </p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={close}
                ></button>
              </header>
              {waitForMfa ? (
                <SendShowConfirmation
                  form={form}
                  values={values}
                  submitError={submitError}
                />
              ) : (
                <SendFormFields
                  form={form}
                  values={values}
                  submitError={submitError}
                />
              )}
              <footer className="modal-card-foot is-justify-content-flex-end">
                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <button className="button" onClick={close}>
                      <FormattedMessage defaultMessage="Cancel" />
                    </button>
                  </div>
                  {!waitForMfa && (
                    <div className="control">
                      <button
                        className="button is-primary"
                        type="submit"
                        disabled={
                          submitting || hasValidationErrors || submitError
                        }
                      >
                        <FormattedMessage defaultMessage="Send now" />
                      </button>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </form>
      )}
    />
  );
}
