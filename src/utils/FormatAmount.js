import React from 'react';
import FormatCurrency from './FormatCurrency';

export default function FormatAmount({
  quantity: { tokens, instrumentCurrency } = {},
}) {
  if (tokens) {
    return `${tokens.formatted}`;
  }
  if (instrumentCurrency) {
    return <FormatCurrency currency={instrumentCurrency} />;
  }
  return null;
}
