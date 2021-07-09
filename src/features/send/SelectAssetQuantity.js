import React from 'react';
import { FormattedMessage } from 'react-intl';

const $ = {
  'Asset quantity': (
    <FormattedMessage
      defaultMessage="Asset quantity"
      description="Asset transfer: input field label: asset quantity"
      id="f1KzmK"
    />
  ),
};

function InputAssetQuantity({ input, meta }) {
  return (
    <>
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label>
        {$['Asset quantity']}
        <input className="input" {...input} />
      </label>
    </>
  );
}

export default InputAssetQuantity;
