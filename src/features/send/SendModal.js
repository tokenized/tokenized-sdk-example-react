import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { OnChange } from 'react-final-form-listeners';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  useTokenizedApi,
  usePrimaryVault,
  useInstrumentWithDetails,
} from '@tokenized/sdk-react-private';
import { fieldIsRequired, useValidators } from '../../utils/validators';
import FormatAmount from '../../utils/FormatAmount';
import SelectPaymail from './SelectPaymail';
import SelectInstrument from './SelectInstrument';
import InstrumentAmountFormField from './InstrumentAmountFormField';
import InputInstrumentMemo from './InputInstrumentMemo';

const SendShowConfirmation = ({
  values: { instrumentId, amount, instrumentMemo, to },
  fee,
}) => {
  let instrument = useInstrumentWithDetails(instrumentId);

  return (
    <div>
      <div>
        <FormattedMessage
          defaultMessage="To"
          description="Instrument transfer: review details: label for send target"
        />
        {': '}
        {to}
      </div>
      <div>
        <FormattedMessage defaultMessage="Instrument" />
        {': '}
        {instrument.formatInstrumentName()}
      </div>
      <div>
        <FormattedMessage defaultMessage="Quantity" />
        {': '}
        {amount}
      </div>
      <div>
        <FormattedMessage defaultMessage="Memo" />
        {': '}
        {instrumentMemo}
      </div>
      <div>
        <FormattedMessage defaultMessage="Fee" />
        {': '}
        <FormatAmount quantity={fee} />
      </div>
    </div>
  );
};

const SendFormFields = ({ form, values: { instrumentId }, disabled }) => {
  const intl = useIntl();

  const validateRequired = useValidators(fieldIsRequired);

  return (
    <>
      <Field name="to" validate={validateRequired}>
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
      <h2 className="label">
        <FormattedMessage defaultMessage="Send" />
      </h2>
      <Field
        name="instrumentId"
        validate={validateRequired}
        render={SelectInstrument}
        disabled={disabled}
      />
      <OnChange name="instrumentId">
        {() => {
          form.change('amount', undefined);
          return null;
        }}
      </OnChange>
      <InstrumentAmountFormField name="amount" instrumentId={instrumentId} />
      <Field name="instrumentMemo" render={InputInstrumentMemo} />
    </>
  );
};

const SendModal = ({ close }) => {
  const tokenizedApi = useTokenizedApi();
  const lockboxId = usePrimaryVault()?.primaryLockboxId;

  const [pending, setPending] = useState(null);

  const onSubmit = async (values) => {
    try {
      const instrumentId = values.instrumentId;
      const memo = values.instrumentMemo;
      const recipients = [
        {
          handle: values.to,
          amount: Number(values.amount),
          sendMax: values.sendMax,
        },
      ];
      const sendOptions = {
        lockboxId,
        instrumentId,
        memo,
        recipients,
      };
      if (!pending) {
        const sendRequest = await tokenizedApi.transfers.send({
          ...sendOptions,
          dryRun: true,
        });
        setPending(sendRequest);
      } else {
        await tokenizedApi.transfers.send(sendOptions);
        setPending(null);
        close();
      }
    } catch (error) {
      setPending(null);
      console.log(error);
      return { [FORM_ERROR]: `${error}` };
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
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
              <section
                className="modal-card-body"
                style={{ overflow: 'visible' }}
              >
                {pending ? (
                  <SendShowConfirmation values={values} />
                ) : (
                  <SendFormFields form={form} values={values} />
                )}
                {submitError && (
                  <div className="has-text-danger">{submitError}</div>
                )}
              </section>
              <footer className="modal-card-foot is-justify-content-flex-end">
                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <button
                      className="button is-primary"
                      type="submit"
                      disabled={submitting || hasValidationErrors}
                    >
                      {pending ? (
                        <FormattedMessage defaultMessage="Confirm" />
                      ) : (
                        <FormattedMessage defaultMessage="Review" />
                      )}
                    </button>
                  </div>
                  <div className="control">
                    <button className="button" onClick={close}>
                      <FormattedMessage defaultMessage="Cancel" />
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default SendModal;
