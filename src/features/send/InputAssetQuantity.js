import React from 'react';
import { FormattedMessage } from 'react-intl';

function InputAssetQuantity({ input, meta, disabled }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      {/* <label className="label">
        <FormattedMessage defaultMessage="Quantity" />
      </label> */}
      <div className="control">
        {disabled ? (
          <input className="input" {...{ input, value: '' }} disabled />
        ) : (
          <input className="input" {...input} />
        )}
      </div>
    </div>
  );
}

export default InputAssetQuantity;
