import React from 'react';
import { FormattedMessage } from 'react-intl';
import FormatCurrency from '../../utils/FormatCurrency';
import FormatQuantity from '../../utils/FormatQuantity';

function ChooseSendMax({ input, max, meta }) {
  return (
    <div className="field">
      {meta.touched && meta.error && (
        <span className="has-text-danger is-pulled-right">{meta.error}</span>
      )}
      {max && (
        <span className="is-pulled-right">
          {!!max?.displayCurrency && (
            <FormattedMessage
              defaultMessage="max: {max} ≈ {converted}"
              description="Instrument transfer max quantity"
              values={{
                max: <FormatQuantity quantity={max} />,
                converted: <FormatCurrency currency={max?.displayCurrency} />,
              }}
            />
          )}
          {!max?.displayCurrency && (
            <FormattedMessage
              defaultMessage="max: {max}"
              description="Instrument transfer max quantity"
              values={{
                max: <FormatQuantity quantity={max} />,
              }}
            />
          )}
        </span>
      )}
      <label className="checkbox">
        <input type="checkbox" {...input} />
        &nbsp;
        <FormattedMessage
          defaultMessage="Send maximum quantity"
          description="Field label (checkbox yes/no)"
        />
      </label>
    </div>
  );
}

export default ChooseSendMax;
