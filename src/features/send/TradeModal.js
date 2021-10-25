import React, { useMemo, useState } from 'react';
import SelectPaymail from './SelectPaymail';
import SelectAssetType from './SelectAssetType';
import InputAssetQuantity from './InputAssetQuantity';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {
  fieldIsRequired,
  fieldIsMoreThanZero,
  makeFieldIsNotMoreThan,
  useValidators,
} from '../../utils/validators';
import { FormattedMessage } from 'react-intl';
import InputAssetMemo from './InputAssetMemo';
import {
  useSendAsset,
  usePrimaryVault,
  useSendMaxEstimate,
  useTokenizedApi,
} from '@tokenized/sdk-react-private';
import FormatQuantity from '../../utils/FormatQuantity';
import InputExpiry from './InputExpiry';
import { hours } from '@tokenized/sdk-js-private/src/tokenized-api/modules/Service';

const SendFormFields = ({
  values: { sendAssetType: { assetId } = {}, assetMemo },
  pending,
}) => {
  const vaultId = usePrimaryVault()?.id;
  const validateRequired = useValidators(fieldIsRequired);
  const maxSendEstimate = useSendMaxEstimate(vaultId, assetId, 1, assetMemo, {
    enabled: !!assetId,
  })?.data;
  const maxSendEstimateNumber = maxSendEstimate?.available?.tokens
    ? maxSendEstimate?.available?.tokens.number
    : maxSendEstimate?.available?.assetCurrency?.number;
  const maxSendEstimateValidator = useMemo(
    () => makeFieldIsNotMoreThan(maxSendEstimateNumber),
    [maxSendEstimateNumber],
  );
  const validateSendQuantity = useValidators(
    fieldIsRequired,
    fieldIsMoreThanZero,
    maxSendEstimateValidator,
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
      <h2 className="label">Request</h2>
      <Field
        name="receiveAssetType"
        validate={validateRequired}
        render={({ ...props }) =>
          SelectAssetType({ ...props, showQuantity: false })
        }
        disabled={disabled}
      />
      <Field
        name="receiveAmount"
        render={InputAssetQuantity}
        validate={validateReceiveQuantity}
      />
      <h2 className="label">Send</h2>
      <Field
        name="sendAssetType"
        validate={validateRequired}
        render={({ ...props }) =>
          SelectAssetType({ ...props, showQuantity: true })
        }
        disabled={disabled}
      />
      <Field
        name="sendAmount"
        render={InputAssetQuantity}
        validate={validateSendQuantity}
        disabled={disabled}
      />
      <Field name="description" render={InputAssetMemo} />
      {pending && (
        <div>
          <FormattedMessage defaultMessage="Computed network fee" />
          {': '}
          <FormatQuantity quantity={pending.fee} />
        </div>
      )}
      <Field name="expiryHours" render={InputExpiry} />
    </>
  );
};

const TradeModal = ({ close }) => {
  const send = useSendAsset();
  const tokenizedApi = useTokenizedApi();
  const vaultId = usePrimaryVault()?.id;

  const [pending, setPending] = useState(null);

  const onSubmit = async ({
    receiveAssetType,
    receiveAmount,
    sendAssetType,
    sendAmount,
    description,
    recipient,
    expiryHours,
  }) => {
    try {
      const options = {
        vaultId,
        expiry: new Date(Date.now() + expiryHours * hours(24)).toISOString(),
        receiveAssetId: receiveAssetType.assetId,
        receiveAmount: Number(receiveAmount),
        sendAssetId: sendAssetType.assetId,
        sendAmount: Number(sendAmount),
        description,
        recipient,
      };
      if (!pending) {
        setPending(
          await tokenizedApi.transfers.initiateTrade({
            ...options,
            doFinalBroadcast: false,
          }),
        );
      } else {
        await send.mutateAsync({
          ...options,
          doFinalBroadcast: true,
          inProgressState: pending,
        });
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
                  <FormattedMessage defaultMessage="Trade assets" />
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
                <SendFormFields values={values} pending={pending} />
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

export default TradeModal;
