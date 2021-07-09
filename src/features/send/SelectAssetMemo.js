import React from 'react';
import { FormattedMessage } from 'react-intl';

const $ = {
  Memo: (
    <FormattedMessage
      defaultMessage="Memo - optional message sent with transaction"
      description="Asset transfer: input field label: memo - optional message sent with transaction"
      id="5ELeq9"
    />
  ),
};

function InputAssetMemo({ input, meta }) {
  return (
    <>
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label>
        {$['Memo']}
        <input className="input" {...input} />
      </label>
    </>
  );
}

export default InputAssetMemo;
