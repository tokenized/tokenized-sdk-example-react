import React from 'react';

function InputAssetQuantity({ input, meta, disabled }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      <div className="control">
        <input className="input" {...input} disabled={disabled} />
      </div>
    </div>
  );
}

export default InputAssetQuantity;
