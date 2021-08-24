import React from 'react';
import FormatCurrency from './FormatCurrency';

export default function FormatQuantity({
  quantity: { tokens, assetCurrency } = {},
}) {
  if (tokens) {
    return `${tokens.formatted}`;
  }
  if (assetCurrency) {
    return <FormatCurrency currency={assetCurrency} />;
  }
  return null;
}
