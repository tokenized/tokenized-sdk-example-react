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
} from '@tokenized/sdk-react-private';
import ChooseSendMax from './ChooseSendMax';
import FormatQuantity from '../../utils/FormatQuantity';

const SendShowConfirmation = ({
  values: {
    assetType: { assetName } = {},
    assetQuantity,
    assetMemo,
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
          description="Asset transfer: review details: label for send target"
        />
        {': '}
        {to}
      </div>
      <div>
        <FormattedMessage defaultMessage="Asset" />
        {': '}
        {assetName}
      </div>
      <div>
        <FormattedMessage defaultMessage="Quantity" />
        {': '}
        {sendMax ? (
          <FormattedMessage
            defaultMessage="maximum"
            description="Asset transfer: review details: indicator that the maximum will be sent"
          />
        ) : (
          assetQuantity
        )}
      </div>
      <div>
        <FormattedMessage defaultMessage="Memo" />
        {': '}
        {assetMemo}
      </div>
      <div>
        <FormattedMessage defaultMessage="Fee" />
        {': '}
        <FormatQuantity quantity={fee} />
      </div>
    </div>
  );
};

const SendFormFields = ({
  values: { assetType: { assetId } = {}, assetMemo, sendMax },
  disabled,
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
  const validateQuantity = useValidators(
    fieldIsRequired,
    fieldIsMoreThanZero,
    maxSendEstimateValidator,
  );
  const validateQuantityWhenNotMax = sendMax ? undefined : validateQuantity;

  return (
    <>
      <Field name="to" validate={validateRequired} render={SelectPaymail} />
      <Field
        name="assetType"
        validate={validateRequired}
        render={SelectAssetType}
        disabled={disabled}
      />
      <Field
        name="sendMax"
        render={ChooseSendMax}
        max={maxSendEstimate?.available}
      />
      <Field
        name="assetQuantity"
        render={InputAssetQuantity}
        disabled={sendMax}
        validate={validateQuantityWhenNotMax}
        key={`${sendMax ? 'max' : maxSendEstimateNumber}`}
      />
      <Field name="assetMemo" render={InputAssetMemo} />
      <div
        style={{
          visibility: maxSendEstimate?.minerFee?.assetCurrency?.number
            ? 'visible'
            : 'hidden',
        }}
      >
        <FormattedMessage defaultMessage="Estimated network fee" />
        {': '}
        <FormatQuantity quantity={maxSendEstimate?.minerFee} />
      </div>
    </>
  );
};

const SendModal = ({ close }) => {
  const send = useSendAsset();
  const vaultId = usePrimaryVault()?.id;

  const [pending, setPending] = useState(null);

  const onSubmit = async (data) => {
    try {
      const assetId = data.assetType.assetId;
      const description = data.assetMemo;
      const recipients = [
        {
          amount: Number(data.assetQuantity),
          sendMax: data.sendMax,
          handle: data.to,
        },
      ];
      const sendOptions = {
        vaultId,
        assetId,
        description,
        recipients,
      };
      if (!pending) {
        const sendRequest = await send.mutateAsync({
          ...sendOptions,
          doFinalBroadcast: false,
        });
        setPending(sendRequest);
      } else {
        await send.mutateAsync({
          ...sendOptions,
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
                  <FormattedMessage defaultMessage="Send assets" />
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
                  <SendShowConfirmation values={values} fee={pending.fee} />
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
