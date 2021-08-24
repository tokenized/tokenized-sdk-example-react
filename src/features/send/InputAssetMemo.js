import React from 'react';
import { FormattedMessage } from 'react-intl';

function InputAssetMemo({ input, meta }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label className="label">
        <FormattedMessage defaultMessage="Memo" />
      </label>
      <div className="control">
        <input className="input" {...input} />
      </div>
      <p className="help">
        <FormattedMessage defaultMessage="Enter a message for the recipient (optional)" />
      </p>
    </div>
  );
}

export default InputAssetMemo;
