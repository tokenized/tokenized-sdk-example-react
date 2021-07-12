import React from 'react';
import SelectPaymail from './SelectPaymail';
import SelectAssetType from './SelectAssetType';
import InputAssetQuantity from './InputAssetQuantity';
import { Field, Form } from 'react-final-form';
import { fieldIsRequired, useValidators } from '../../utils/validators';
import { FormattedMessage } from 'react-intl';
import InputAssetMemo from './InputAssetMemo';
import {
  usePrimaryVault,
  useSendMaxEstimate,
} from '@tokenized/sdk-react-private';
import ChooseSendMax from './ChooseSendMax';
import FormatQuantity from '../../utils/FormatQuantity';

const $ = {
  'Should be a quantity greater than zero': (
    <FormattedMessage
      defaultMessage="Should be a quantity greater than zero"
      description="Asset transfer: error message: asset quantity should be greater than zero"
      id="mZ+5PJ"
    />
  ),
  'Too much': (
    <FormattedMessage
      defaultMessage="Too much"
      description="Asset transfer: error message: quantity larger than available assets"
      id="aoZTnl"
    />
  ),
  Review: (
    <FormattedMessage
      defaultMessage="Review"
      description="Asset transfer: review button"
      id="2boX6x"
    />
  ),
  Cancel: (
    <FormattedMessage
      defaultMessage="Cancel"
      description="Asset transfer: cancel button"
      id="iBTSzG"
    />
  ),
};

const greaterThanZero = (value) =>
  value < 0 ? $['Should be a quantity greater than zero'] : undefined;
const notMoreThanMax = (max) => (value) =>
  value > max ? $['Too much'] : undefined;
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

const SendFormFields = ({
  values: { assetType: { assetId } = {}, assetMemo, sendMax },
}) => {
  const validateRequired = useValidators(fieldIsRequired);

  let maxSendEstimate = useSendMaxEstimate(
    usePrimaryVault()?.id,
    assetId,
    1,
    assetMemo,
  );

  return (
    <>
      <Field name="to" validate={validateRequired} render={SelectPaymail} />
      <Field
        name="assetType"
        validate={validateRequired}
        render={SelectAssetType}
      />
      <Field
        name="sendMax"
        render={ChooseSendMax}
        max={maxSendEstimate.data?.available}
      />
      <Field
        name="assetQuantity"
        render={InputAssetQuantity}
        validate={composeValidators(
          greaterThanZero,
          notMoreThanMax(maxSendEstimate.data?.number),
        )}
        disabled={sendMax}
      />
      <Field name="assetMemo" render={InputAssetMemo} />
      <div>
        Miner fee: <FormatQuantity quantity={maxSendEstimate.data?.minerFee} />
      </div>
    </>
  );
};

const SendModal = ({ close }) => {
  const onSubmit = (data) => console.log('submitted!', data);

  return (
    <Form
      onSubmit={onSubmit}
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
                <SendFormFields values={values} />
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  type="submit"
                  disabled={submitting || hasValidationErrors}
                >
                  {$['Review']}
                </button>
                <button className="button" onClick={close}>
                  {$['Cancel']}
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
