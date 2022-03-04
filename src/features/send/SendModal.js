import React, { useMemo, useState } from 'react';
import SelectPaymail from './SelectPaymail';
import SelectInstrumentType from './SelectInstrumentType';
import InputInstrumentQuantity from './InputInstrumentQuantity';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {
  fieldIsRequired,
  fieldIsMoreThanZero,
  makeFieldIsNotMoreThan,
  useValidators,
} from '../../utils/validators';
import { FormattedMessage } from 'react-intl';
import InputInstrumentMemo from './InputInstrumentMemo';
import {
  useTokenizedApi,
  usePrimaryVault,
  useAvailableAmount,
} from '@tokenized/sdk-react-private';
import ChooseSendMax from './ChooseSendMax';
import FormatAmount from '../../utils/FormatAmount';

const SendShowConfirmation = ({
  values: {
    instrumentType: { instrumentName } = {},
    instrumentQuantity,
    instrumentMemo,
    sendMax,
    to,
  },
  fee,
}) => {
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
        {instrumentName}
      </div>
      <div>
        <FormattedMessage defaultMessage="Quantity" />
        {': '}
        {sendMax ? (
          <FormattedMessage
            defaultMessage="maximum"
            description="Instrument transfer: review details: indicator that the maximum will be sent"
          />
        ) : (
          instrumentQuantity
        )}
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

const SendFormFields = ({
  values: { instrumentType: { instrumentId } = {}, sendMax },
  disabled,
}) => {
  const vaultId = usePrimaryVault()?.id;
  const validateRequired = useValidators(fieldIsRequired);
  const sendMaximum = useAvailableAmount(vaultId, instrumentId);

  const maxSendEstimateValidator = useMemo(
    () => makeFieldIsNotMoreThan(sendMaximum),
    [sendMaximum],
  );
  const validateQuantity = useValidators(
    fieldIsRequired,
    fieldIsMoreThanZero,
    maxSendEstimateValidator,
  );
  const validateQuantityWhenNotMax = sendMax ? undefined : validateQuantity;

  return (
    <>
      <Field name="to" validate={validateRequired} render={SelectPaymail} />
      <h2 className="label">
        <FormattedMessage defaultMessage="Send" />
      </h2>
      <Field
        name="instrumentType"
        validate={validateRequired}
        render={SelectInstrumentType}
        disabled={disabled}
      />
      <Field name="sendMax" render={ChooseSendMax} type="checkbox" />

      {!sendMax && (
        <Field
          name="instrumentQuantity"
          render={InputInstrumentQuantity}
          disabled={sendMax}
          validate={validateQuantityWhenNotMax}
          key={`${sendMax ? 'max' : sendMaximum}`}
        />
      )}
      <Field name="instrumentMemo" render={InputInstrumentMemo} />
    </>
  );
};

const SendModal = ({ close }) => {
  const tokenizedApi = useTokenizedApi();
  const lockboxId = usePrimaryVault()?.primaryLockboxId;

  const [pending, setPending] = useState(null);

  const onSubmit = async (data) => {
    try {
      const instrumentId = data.instrumentType.instrumentId;
      const memo = data.instrumentMemo;
      const recipients = [
        {
          handle: data.to,
          amount: Number(data.instrumentQuantity),
          sendMax: data.sendMax,
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
                  <SendFormFields values={values} />
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
