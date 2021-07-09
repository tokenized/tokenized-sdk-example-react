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
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label className="label">
        {$['Asset quantity']}
        <div className="control">
          <input className="input" {...input} />
        </div>
      </label>
    </div>
  );
}

export default InputAssetQuantity;
