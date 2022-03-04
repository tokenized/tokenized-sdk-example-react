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
  useAvailableAmount,
  usePrimaryVault,
  useTokenizedApi,
} from '@tokenized/sdk-react-private';
import FormatAmount from '../../utils/FormatAmount';
import InputExpiry from './InputExpiry';
import { hours } from '@tokenized/sdk-js-private/src/tokenized-api/modules/Service';

export const MODE_TRADE = 'trade';
export const MODE_REQUEST = 'request';

const SendFormFields = ({ mode, values: { sendInstrumentType }, pending }) => {
  const vaultId = usePrimaryVault()?.id;

  const sendMaximum = useAvailableAmount(
    vaultId,
    sendInstrumentType?.instrumentId,
  );

  const validateRequired = useValidators(fieldIsRequired);

  const maximumSendValidator = useMemo(
    () => makeFieldIsNotMoreThan(sendMaximum ?? Infinity),
    [sendMaximum],
  );
  const validateSendQuantity = useValidators(
    fieldIsRequired,
    fieldIsMoreThanZero,
    maximumSendValidator,
  );

  const validateReceiveQuantity = useValidators(
    fieldIsRequired,
    fieldIsMoreThanZero,
  );

  const disabled = !!pending;

  return (
    <>
      <Field
        name="recipient"
        validate={validateRequired}
        render={SelectPaymail}
        disabled={disabled}
      />
      <h2 className="label">
        <FormattedMessage defaultMessage="Request" />
      </h2>
      <Field
        name="receiveInstrumentType"
        validate={validateRequired}
        render={({ ...props }) =>
          SelectInstrumentType({ ...props, showQuantity: false })
        }
        disabled={disabled}
      />
      <Field
        name="receiveAmount"
        render={InputInstrumentQuantity}
        validate={validateReceiveQuantity}
        disabled={disabled}
      />
      {mode === MODE_TRADE && (
        <>
          <h2 className="label">
            <FormattedMessage defaultMessage="Send" />
          </h2>
          <Field
            name="sendInstrumentType"
            validate={validateRequired}
            render={({ ...props }) =>
              SelectInstrumentType({ ...props, showQuantity: true })
            }
            disabled={disabled}
          />
          <Field
            name="sendAmount"
            render={InputInstrumentQuantity}
            validate={validateSendQuantity}
            disabled={disabled}
            key={sendMaximum}
          />
        </>
      )}
      <Field name="memo" render={InputInstrumentMemo} disabled={disabled} />
      <Field
        name="expiryHours"
        render={InputExpiry}
        initialValue={48}
        disabled={disabled}
      />
      {pending && (
        <div>
          <FormattedMessage defaultMessage="Computed network fee" />
          {': '}
          <FormatAmount quantity={pending?.fee} />
        </div>
      )}
    </>
  );
};

export default function TradeModal({ mode, close }) {
  const tokenizedApi = useTokenizedApi();
  const lockboxId = usePrimaryVault()?.primaryLockboxId;

  const [pending, setPending] = useState(null);

  const onSubmit = async ({
    receiveInstrumentType,
    receiveAmount,
    sendInstrumentType,
    sendAmount,
    memo,
    recipient,
    expiryHours,
  }) => {
    try {
      const options = {
        lockboxId,
        expiry: new Date(Date.now() + hours(expiryHours)).toISOString(),
        memo,
        recipient,
        ...(mode === MODE_TRADE
          ? {
              receiveInstrumentId: receiveInstrumentType.instrumentId,
              receiveAmount: Number(receiveAmount),
              sendInstrumentId: sendInstrumentType.instrumentId,
              sendAmount: Number(sendAmount),
            }
          : {
              instrumentId: receiveInstrumentType.instrumentId,
              amount: Number(receiveAmount),
            }),
      };

      const method = mode === MODE_TRADE ? 'trade' : 'request';

      if (!pending) {
        setPending(
          await tokenizedApi.transfers[method]({
            ...options,
            dryRun: true,
          }),
        );
      } else {
        await tokenizedApi.transfers[method](options);
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
                  {mode === MODE_TRADE && (
                    <FormattedMessage defaultMessage="Trade instruments" />
                  )}
                  {mode === MODE_REQUEST && (
                    <FormattedMessage defaultMessage="Request instruments" />
                  )}
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
                <SendFormFields mode={mode} values={values} pending={pending} />
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
}
