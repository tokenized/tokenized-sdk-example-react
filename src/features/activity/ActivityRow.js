import React, { useState } from 'react';
import classNames from 'classnames';
import { FormattedDate, FormattedMessage } from 'react-intl';
import FormatQuantity from '../../utils/FormatQuantity';

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

export function ActivityRow({
  item: {
    txId,
    dateModified,
    formatted: { description, counterparty, tradeAction, tradeResponse },
    counterparties,
    memo,
    assets,
    signTrade,
    executeTrade,
    acceptTrade,
    acceptRequest,
  },
}) {
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
      <td>
        {error}
        {!error && executeTrade && (
          <button className={buttonClass} onClick={load(executeTrade)}>
            <FormattedMessage defaultMessage="Execute trade" />
          </button>
        )}
        {!error && signTrade && (
          <button className={buttonClass} onClick={load(signTrade)}>
            <FormattedMessage defaultMessage="Sign trade" />
          </button>
        )}
        {!error && acceptTrade && (
          <button className={buttonClass} onClick={load(acceptTrade)}>
            <FormattedMessage defaultMessage="Accept trade" />
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
