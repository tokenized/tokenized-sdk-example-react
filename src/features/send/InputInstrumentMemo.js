import React from 'react';
import { FormattedMessage } from 'react-intl';

function InputInstrumentMemo({ input, meta, disabled }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label className="label">
        <FormattedMessage defaultMessage="Memo" />
      </label>
      <div className="control">
        <input className="input" {...input} disabled={disabled} />
      </div>
      <p className="help">
        <FormattedMessage defaultMessage="Enter a message for the recipient (optional)" />
      </p>
    </div>
  );
}

export default InputInstrumentMemo;