import React from 'react';
import FormatCurrency from './FormatCurrency';

export default function FormatQuantity({
  quantity: { tokens, assetName, assetCurrency } = {},
  showCouponName = true,
}) {
  if (tokens)
    return `${tokens?.formatted} ${showCouponName ? `(${assetName})` : ''}`;

  if (assetCurrency) return <FormatCurrency currency={assetCurrency} />;

  return '';
}
