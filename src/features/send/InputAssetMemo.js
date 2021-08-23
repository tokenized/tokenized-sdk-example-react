import React from 'react';
import { FormattedMessage } from 'react-intl';
import { findMessage } from '../../utils/messages';

const $ = findMessage(
  <FormattedMessage
    defaultMessage="Memo - optional message sent with transaction"
    description="Asset transfer: input field label: memo - optional message sent with transaction"
  />,
);

function InputAssetMemo({ input, meta }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label className="label">
        {$('Memo - optional message sent with transaction')}
        <div className="control">
          <input className="input" {...input} />
        </div>
      </label>
    </div>
  );
}

export default InputAssetMemo;
