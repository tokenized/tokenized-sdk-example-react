import React from 'react';
import SelectPaymail from './SelectPaymail';
import SelectAssetType from './SelectAssetType';
import InputAssetQuantity from './SelectAssetQuantity';
import { Field, Form } from 'react-final-form';
import { fieldIsRequired, useValidators } from '../../utils/validators';
import { FormattedMessage } from 'react-intl';
import InputAssetMemo from './SelectAssetMemo';

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

const SendModal = ({ close }) => {
  const onSubmit = (data) => console.log('submitted!', data);

  const validateRequired = useValidators(fieldIsRequired);

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        return {
          assetQuantity: !(values.assetQuantity > 0)
            ? $['Should be a quantity greater than zero']
            : values.assetQuantity >
              values.assetType?.quantities.balance.assetCurrency.number
            ? $['Too much']
            : undefined,
        };
      }}
      render={({ handleSubmit }) => (
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
                style={{ overflow: 'visible ' }}
              >
                <Field
                  name="to"
                  validate={validateRequired}
                  render={SelectPaymail}
                />
                <Field
                  name="assetType"
                  validate={validateRequired}
                  render={SelectAssetType}
                />
                <Field name="assetQuantity" render={InputAssetQuantity} />
                <Field name="assetMemo" render={InputAssetMemo} />
              </section>
              <footer className="modal-card-foot">
                <button className="button is-success" type="submit">
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
