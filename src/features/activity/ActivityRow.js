import React from 'react';
import classNames from 'classnames';
import { FormattedDate, FormattedMessage } from 'react-intl';
import FormatQuantity from '../../utils/FormatQuantity';

export function ActivityHeader() {
  return (
    <tr>
      <th className="has-text-left">
        <div>
          <FormattedMessage
            defaultMessage="Event"
            description="Activity table column header"
          />
        </div>
      </th>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="Details"
          description="Activity table column header"
        />
      </th>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="Amounts"
          description="Activity table column header"
        />
      </th>
      <th className="has-text-left">
        <FormattedMessage
          defaultMessage="Last updated"
          description="Activity table column header"
        />
      </th>
    </tr>
  );
}

export function ActivityRow({
  item: {
    txId,
    dateModified,
    formatted: { description, counterparty, tradeAction, tradeResponse },
    counterparties,
    memo,
    assets,
    contract,
  },
}) {
  let [{ transfers = [] } = {}] = counterparties || [];
  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <td>
        <div className="has-text-weight-bold">{description}</div>
        <div>{counterparty}</div>
      </td>
      <td>
        {!!tradeAction && <div>{tradeAction}</div>}
        {!!tradeResponse && <div>{tradeResponse}</div>}
        {!!memo && <div>{memo}</div>}
      </td>
      <td>
        {!transfers.length &&
          assets?.map(
            ({ delta }, index) =>
              !!delta?.tokens?.number && (
                <div
                  key={index}
                  className={classNames({
                    'has-text-danger-dark': delta?.tokens?.number < 0,
                    'has-text-success-dark': delta?.tokens?.number > 0,
                  })}
                >
                  <FormatQuantity quantity={delta} />
                </div>
              ),
          )}
        {transfers.map(({ quantity, direction }, index) => (
          <div
            key={index}
            className={classNames({
              'has-text-danger-dark': direction === 'sent',
              'has-text-success-dark': direction === 'received',
            })}
          >
            <FormatQuantity quantity={quantity} />
          </div>
        ))}
      </td>
      <td>
        <div>
          <FormattedDate
            value={new Date(dateModified)}
            dateStyle="short"
            timeStyle="short"
          />
        </div>
        <div>
          {txId && (
            <a href={`https://whatsonchain.com/tx/${txId}`} title={txId}>
              {txId.slice(0, 8) + '…'}
            </a>
          )}
        </div>
      </td>
    </tr>
  );
}
