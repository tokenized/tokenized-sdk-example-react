import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function InputExpiry({ input, meta, disabled }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <label className="label">
        <FormattedMessage defaultMessage="Offer expires after (hours)" />
      </label>
      <div className="control">
        <input className="input" type="number" {...input} />
      </div>
    </div>
  );
}
