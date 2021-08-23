import React from 'react';
import { FormattedMessage } from 'react-intl';
import FormatCurrency from '../../utils/FormatCurrency';
import FormatQuantity from '../../utils/FormatQuantity';
import { findMessage } from '../../utils/messages';

const $ = findMessage(
  <FormattedMessage
    defaultMessage="Send maximum quantity"
    description="Asset transfer: input field label: Send maximum quantity (checkbox yes/no)"
  />,
);

function ChooseSendMax({ input, max, meta }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      {max && (
        <span className="is-pulled-right">
          <FormattedMessage
            defaultMessage="max: {max} ≈ {converted}"
            description="Asset transfer: asset transfer maximum in original units and display currency"
            values={{
              max: <FormatQuantity quantity={max} />,
              converted: <FormatCurrency currency={max?.displayCurrency} />,
            }}
          />
        </span>
      )}
      <label className="checkbox">
        <input type="checkbox" {...input} />
        &nbsp;
        {$('Send maximum quantity')}
      </label>
    </div>
  );
}

export default ChooseSendMax;
