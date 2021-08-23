import React, { useState } from 'react';
import SelectPaymail from './SelectPaymail';
import SelectAssetType from './SelectAssetType';
import InputAssetQuantity from './InputAssetQuantity';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {
  fieldIsRequired,
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
import { findMessage } from '../../utils/messages';

const $ = findMessage(
  <FormattedMessage
    defaultMessage="Should be a quantity greater than zero"
    description="Asset transfer: error message: asset quantity should be greater than zero"
  />,
  <FormattedMessage
    defaultMessage="Too much"
    description="Asset transfer: error message: quantity larger than available assets"
  />,
  <FormattedMessage
    defaultMessage="Review"
    description="Asset transfer: review button"
  />,
  <FormattedMessage
    defaultMessage="Confirm"
    description="Asset transfer: confirm button"
  />,
  <FormattedMessage
    defaultMessage="Cancel"
    description="Asset transfer: cancel button"
  />,
  <FormattedMessage
    defaultMessage="Estimated miner fee"
    description="Asset transfer: label for estimation of miner transfer fee"
  />,
  <FormattedMessage
    defaultMessage="To"
    description="Asset transfer: review details: label for send target"
  />,
  <FormattedMessage
    defaultMessage="Asset"
    description="Asset transfer: review details: label for asset to send"
  />,
  <FormattedMessage
    defaultMessage="Quantity"
    description="Asset transfer: review details: label for asset quantity to send"
  />,
  <FormattedMessage
    defaultMessage="maximum"
    description="Asset transfer: review details: indicator that the maximum will be sent"
  />,
  <FormattedMessage
    defaultMessage="Memo"
    description="Asset transfer: review details: label for memo to add to transfer"
  />,
  <FormattedMessage
    defaultMessage="Fee"
    description="Asset transfer: review details: label for computed fee for transfer"
  />,
);

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
        {$('To')}: {to}
      </div>
      <div>
        {$('Asset')}: {assetName}
      </div>
      <div>
        {$('Quantity')}: {sendMax ? $('maximum') : assetQuantity}
      </div>
      <div>
        {$('Memo')}: {assetMemo}
      </div>
      <div>
        {$('Fee')}: <FormatQuantity quantity={fee} />
      </div>
    </div>
  );
};

const greaterThanZero = (value) =>
  value > 0 ? undefined : $('Should be a quantity greater than zero');

const SendFormFields = ({
  values: { assetType: { assetId } = {}, assetMemo, sendMax },
  disabled,
}) => {
  const validateRequired = useValidators(fieldIsRequired);

  let maxSendEstimate = useSendMaxEstimate(
    usePrimaryVault()?.id,
    assetId,
    1,
    assetMemo,
    { enabled: !!assetId },
  );

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
        max={maxSendEstimate.data?.available}
      />
      <Field
        name="assetQuantity"
        render={InputAssetQuantity}
        disabled={sendMax}
        validate={useValidators(
          makeFieldIsNotMoreThan(maxSendEstimate.data?.available?.number),
        )}
      />
      <Field name="assetMemo" render={InputAssetMemo} />
      <div
        style={{
          visibility: maxSendEstimate.data?.minerFee.number
            ? 'visible'
            : 'hidden',
        }}
      >
        {$('Estimated miner fee')}:
        <FormatQuantity quantity={maxSendEstimate.data?.minerFee} />
      </div>
    </>
  );
};

const SendModal = ({ close }) => {
  const send = useSendAsset();
  let vaultId = usePrimaryVault()?.id;

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
        const sendRequest = await send.mutateAsync(sendOptions, false);
        setPending(sendRequest);
      } else {
        await send.mutateAsync(sendOptions, true, pending);
        close();
      }
    } catch (error) {
      console.log(error);
      return { [FORM_ERROR]: `${error}` };
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => ({
        assetQuantity: values.sendMax
          ? undefined
          : greaterThanZero(values.assetQuantity),
      })}
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
                <p className="modal-card-title">Send</p>
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
                  <div className="has-text-danger	">{submitError}</div>
                )}
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  type="submit"
                  disabled={submitting || hasValidationErrors}
                >
                  {pending ? $('Confirm') : $('Review')}
                </button>
                <button className="button" onClick={close}>
                  {$('Cancel')}
                </button>
              </footer>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default SendModal;
