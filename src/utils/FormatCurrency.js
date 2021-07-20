import React from 'react';
import { FormattedNumber } from 'react-intl';

export default function FormatCurrency({
  currency: { number, NumberFormatOptions } = {},
}) {
  return <FormattedNumber value={number} {...NumberFormatOptions} />;
}
