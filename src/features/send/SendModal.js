import React, { useState } from 'react';
import SelectPaymail from './SelectPaymail';
import SelectAssetType from './SelectAssetType';
import InputAssetQuantity from './InputAssetQuantity';
import { Field, Form } from 'react-final-form';
import {
  fieldIsRequired,
  makeFieldIsNotMoreThan,
  useValidators,
} from '../../utils/validators';
import { FormattedMessage } from 'react-intl';
import InputAssetMemo from './InputAssetMemo';
import {
  useConfirmSendAsset,
  usePrepareSendAsset,
  usePrimaryVault,
  useSendMaxEstimate,
  useTokenizedApi,
} from '@tokenized/sdk-react-private';
import ChooseSendMax from './ChooseSendMax';
import FormatQuantity from '../../utils/FormatQuantity';
import { findMessage } from '../../utils/messages';

const $ = findMessage(
  <FormattedMessage
    defaultMessage="Should be a quantity greater than zero"
    description="Asset transfer: error message: asset quantity should be greater than zero"
    id="mZ+5PJ"
  />,
  <FormattedMessage
    defaultMessage="Too much"
    description="Asset transfer: error message: quantity larger than available assets"
    id="aoZTnl"
  />,
  <FormattedMessage
    defaultMessage="Review"
    description="Asset transfer: review button"
    id="2boX6x"
  />,
  <FormattedMessage
    defaultMessage="Confirm"
    description="Asset transfer: confirm button"
    id="qvvZcz"
  />,
  <FormattedMessage
    defaultMessage="Cancel"
    description="Asset transfer: cancel button"
    id="iBTSzG"
  />,
  <FormattedMessage
    defaultMessage="Estimated miner fee"
    description="Asset transfer: label for estimation of miner transfer fee"
    id="BnZgJS"
  />,
  <FormattedMessage
    defaultMessage="To"
    description="Asset transfer: review details: label for send target"
    id="MGVbsq"
  />,
  <FormattedMessage
    defaultMessage="Asset"
    description="Asset transfer: review details: label for asset to send"
    id="kxcjH1"
  />,
  <FormattedMessage
    defaultMessage="Quantity"
    description="Asset transfer: review details: label for asset quantity to send"
    id="AHUNQG"
  />,
  <FormattedMessage
    defaultMessage="maximum"
    description="Asset transfer: review details: indicator that the maximum will be sent"
    id="p3amHf"
  />,
  <FormattedMessage
    defaultMessage="Memo"
    description="Asset transfer: review details: label for memo to add to transfer"
    id="f5SHXC"
  />,
  <FormattedMessage
    defaultMessage="Fee"
    description="Asset transfer: review details: label for computed fee for transfer"
    id="00bEzj"
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
      {!!maxSendEstimate.data?.minerFee.number && (
        <div>
          {$('Estimated miner fee')}:
          <FormatQuantity quantity={maxSendEstimate.data?.minerFee} />
        </div>
      )}
    </>
  );
};

const SendModal = ({ close }) => {
  const prepare = usePrepareSendAsset();
  const confirm = useConfirmSendAsset();
  const tokenizedApi = useTokenizedApi();
  let vaultId = usePrimaryVault()?.id;

  const [pending, setPending] = useState(null);

  const onSubmit = async (data) => {
    if (!pending) {
      let assetId = data.assetType.assetId;
      let description = data.assetMemo;
      let recipients = [
        {
          amount: data.assetQuantity,
          sendMax: data.sendMax,
          handle: data.to,
        },
      ];
      let sendRequest = await prepare.mutateAsync({
        vaultId,
        assetId,
        description,
        recipients,
      });

      setPending(sendRequest);
    } else {
      await confirm.mutateAsync(pending);
      tokenizedApi.transfers.afterSendAsset();
      close();
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
      render={({ handleSubmit, hasValidationErrors, submitting, values }) => (
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
