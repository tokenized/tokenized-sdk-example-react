import React from 'react';
import classNames from 'classnames';
import { FormattedDate, FormattedMessage } from 'react-intl';
import {
  useActivityEvent,
  InstrumentAmount,
} from '@tokenized/sdk-react-private';

export function ActivityHeader() {
  return (
    <tr>
      <th className="has-text-left">
        <FormattedMessage defaultMessage="Event" />
      </th>
      <th className="has-text-left">
        <FormattedMessage defaultMessage="Details" />
      </th>
      <th className="has-text-left">
        <FormattedMessage defaultMessage="Amounts" />
      </th>
      <th className="has-text-left">
        <FormattedMessage defaultMessage="Last updated" />
      </th>
    </tr>
  );
}

export function ActivityRow({ item }) {
  const activityEvent = useActivityEvent(item) || {};
  const {
    dateModified,
    formatted: { description, counterparty, tradeAction, tradeResponse },
    counterparties,
    memo,
    instruments,
  } = activityEvent;

  let [{ transfers = [] } = {}] = counterparties || [];

  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <td>
        <div className="has-text-weight-bold">{description}</div>
        <div>{counterparty}</div>
      </td>
      <td className="is-clipped" style={{ maxWidth: 400 }}>
        {!!tradeAction && <div>{tradeAction}</div>}
        {!!tradeResponse && <div>{tradeResponse}</div>}
        {!!memo && (
          <div
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {memo}
          </div>
        )}
      </td>
      <td>
        {!transfers.length &&
          instruments?.map?.(
            ({ delta }, index) =>
              !!delta && (
                <div
                  key={index}
                  className={classNames({
                    'has-text-danger-dark': delta.amount < 0,
                    'has-text-success-dark': delta.amount > 0,
                  })}
                >
                  <InstrumentAmount
                    instrument={delta}
                    showCurrencyCode
                    showWhenZero={false}
                    numberFormatOverrides={{ signDisplay: 'always' }}
                  />
                </div>
              ),
          )}
        {transfers?.map?.(({ quantity, direction }, index) => (
          <div
            key={index}
            className={classNames({
              'has-text-danger-dark': direction === 'sent',
              'has-text-success-dark': direction === 'received',
            })}
          >
            <InstrumentAmount
              instrument={quantity}
              showCurrencyCode
              showWhenZero={false}
              numberFormatOverrides={{ signDisplay: 'always' }}
            />
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
      </td>
    </tr>
  );
}
