import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import FormatQuantity from '../../utils/FormatQuantity';



export function ActivityHeader() {
  return (
    <tr>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="With"
          description="Activity table header: with"
          id="WFpQ7G"
        />
      </th>
      <th className="has-text-left">
        <div>
          <FormattedMessage
            defaultMessage="Type"
            description="Activity table header: activity type"
            id="QOJ75c"
          />
        </div>
        <div>
          <FormattedMessage
            defaultMessage="Status"
            description="Activity table header: activity status"
            id="/j2Yi1"
          />
        </div>
      </th>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="Title"
          description="Activity table header: title"
          id="y2ZMIl"
        />
      </th>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="Details"
          description="Activity table header: details"
          id="1HHb9u"
        />
      </th>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="When"
          description="Activity table header: when"
          id="fyfIW2"
        />
      </th>
    </tr>
  );
}

export function ActivityRow({
  item: {
    txId,
    dateCreated,
    activityEventStatus: { name: activityEventStatus },
    activityEventType: { name: activityEventType },
    counterParties,
    memo,
    assets,
    contract,
  },
}) {
  let [{ displayName = '', transfers = [] } = {}] = counterParties || [];
  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <td>{displayName}</td>
      <td>
        <div>{activityEventType}</div>
        <div>{activityEventStatus}</div>
      </td>
      <td>
        {memo}
        {contract?.name}
      </td>
      <td>
        {!transfers.length &&
          assets?.map(({ total, delta }, index) => (
            <div key={index}>
              <div>
                <FormattedMessage
                  defaultMessage="Total:"
                  description="Activity table assets label: total"
                  id="qq2T4k"
                />
                &nbsp;
                <FormatQuantity quantity={total} />
              </div>
              <div>
                <FormattedMessage
                  defaultMessage="Change:"
                  description="Activity table assets label: change"
                  id="Vetw5f"
                />
                &nbsp;
                <FormatQuantity quantity={delta} />
              </div>
            </div>
          ))}

        {transfers.map(({ direction, quantity }, index) => (
          <div key={index}>
            {direction == 'received' ? '+' : '-'}
            &nbsp;
            <FormatQuantity quantity={quantity} />
          </div>
        ))}
      </td>
      <td>
        <div>
          <FormattedDate
            value={new Date(dateCreated)}
            dateStyle="short"
            timeStyle="short"
          />
        </div>
        <div>
          <a href={`https://whatsonchain.com/tx/${txId}`} title={txId}>
            {txId.slice(0, 8) + '…'}
          </a>
        </div>
      </td>
    </tr>
  );
}
