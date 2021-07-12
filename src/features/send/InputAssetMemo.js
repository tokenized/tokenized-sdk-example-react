import React from 'react';
import { FormattedMessage } from 'react-intl';

const $ = {
  'Memo - optional message sent with transaction': (
    <FormattedMessage
      defaultMessage="Memo - optional message sent with transaction"
      description="Asset transfer: input field label: memo - optional message sent with transaction"
      id="5ELeq9"
    />
  ),
};

function InputAssetMemo({ input, meta }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label className="label">
        {$['Memo - optional message sent with transaction']}
        <div className="control">
          <input className="input" {...input} />
        </div>
      </label>
    </div>
  );
}

export default InputAssetMemo;
