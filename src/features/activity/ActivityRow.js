import React, { useState } from 'react';
import classNames from 'classnames';
import { FormattedDate, FormattedMessage } from 'react-intl';
import {
  useActivityEvent,
  InstrumentAmount,
} from '@tokenized/sdk-react-private';

export function ActivityHeader({ showAction }) {
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
      {showAction && (
        <th className="has-text-left">
          <FormattedMessage defaultMessage="Action" />
        </th>
      )}
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
    acceptTrade,
    executeTrade,
    acceptRequest,
  } = activityEvent;

  let [{ transfers = [] } = {}] = counterparties || [];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const buttonClass = classNames('button', isLoading && 'is-loading');
  const load = (fn) => async () => {
    setIsLoading(true);
    try {
      await fn();
    } catch (e) {
      setError(e.toString());
    }
  };

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
      <td>
        {error}
        {!error && acceptTrade && (
          <button className={buttonClass} onClick={load(acceptTrade)}>
            <FormattedMessage defaultMessage="Accept trade" />
          </button>
        )}
        {!error && executeTrade && (
          <button className={buttonClass} onClick={load(executeTrade)}>
            <FormattedMessage defaultMessage="Execute trade" />
          </button>
        )}
        {!error && acceptRequest && (
          <button className={buttonClass} onClick={load(acceptRequest)}>
            <FormattedMessage defaultMessage="Accept request" />
          </button>
        )}
      </td>
    </tr>
  );
}
