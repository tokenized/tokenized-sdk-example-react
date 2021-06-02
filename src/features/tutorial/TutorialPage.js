import React from 'react';
import classNames from 'classnames';
import {
  usePrimaryVault,
  useFilteredBalances,
} from '@tokenized/sdk-react-private';

const assetTypeColor = {
  CCY: 'is-link',
  COU: 'is-info',
  LOY: 'is-success',
  CHP: 'is-warning',
  TIC: 'is-primary',
};

export default function TutorialPage() {
  const vault = usePrimaryVault();
  const balances = useFilteredBalances(vault?.id, {
    includeInactive: false,
    displayCurrencyCode: 'AUD',
  });

  return (
    <section className="section">
      <h1 className="title">Tutorial sandbox</h1>
      {balances?.data && (
        <div className="columns">
          <div className="column is-half">
            <div className="box">
              <h2 className="title is-5">Asset summary</h2>
              <div className="field is-grouped is-grouped-multiline">
                {balances.data.map((balance) => {
                  const quantity = balance.isLiability
                    ? balance.quantities?.issuedLiability
                    : balance.quantities?.value;
                  let valueOrLiability;
                  let tokenCount = false;
                  if (
                    quantity?.displayCurrency &&
                    quantity.displayCurrency.number > 0
                  ) {
                    const number = balance.isLiability
                      ? -quantity.displayCurrency.number
                      : quantity.displayCurrency.number;
                    const formatOptions = {
                      ...quantity.displayCurrency.NumberFormatOptions,
                      currencySign: 'accounting',
                    };
                    valueOrLiability = new Intl.NumberFormat(
                      undefined,
                      formatOptions,
                    ).format(number);
                  } else if (quantity?.tokens?.formatted) {
                    valueOrLiability = quantity.tokens.formatted;
                    tokenCount = true;
                  }
                  return (
                    <div key={balance.assetId} className="control">
                      <div className="tags has-addons">
                        <span
                          className={classNames(
                            'tag',
                            balance.isLiability && ' has-text-weight-bold',
                            assetTypeColor[balance.assetType?.code] ||
                              'is-light',
                          )}
                        >
                          {balance?.assetName}
                        </span>
                        {valueOrLiability && (
                          <span
                            className={classNames(
                              'tag',
                              tokenCount ? 'is-link is-light' : 'is-dark',
                              !tokenCount && 'has-text-weight-bold',
                            )}
                          >
                            {valueOrLiability}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
