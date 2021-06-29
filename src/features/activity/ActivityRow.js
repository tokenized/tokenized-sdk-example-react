import React from 'react';

const dateFormat = new Intl.DateTimeFormat([], {
  dateStyle: 'short',
  timeStyle: 'short',
});

export default function ActivityRow({
  item: {
    transactionId,
    dateCreated,
    activityEventType,
    activityEventStatus,
    counterParties,
    memo,
    contract,
  },
}) {
  let [{ displayName = '', transfers = [] } = {}] = counterParties || [];
  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <td>
        <a href={`https://whatsonchain.com/tx/${transactionId}`}>
          {dateFormat.format(new Date(dateCreated))}
        </a>
      </td>
      <td>{displayName}</td>
      <td>{activityEventStatus}</td>
      <td>{activityEventType}</td>
      <td>{memo}</td>
      <td>{contract?.name}</td>
      <td>
        {transfers.map(({ direction, quantity, asset, assetId }, index) => (
          <div key={index}>
            {direction} {quantity}{' '}
            {asset ? JSON.stringify(asset?.assetTypeSpecifics) : assetId}
          </div>
        ))}
      </td>
    </tr>
  );
}
