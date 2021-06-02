import React from 'react';
import {
  usePrimaryVault,
  useFilteredBalances,
} from '@tokenized/sdk-react-private';

export default function TutorialPage() {
  const vault = usePrimaryVault();
  const balances = useFilteredBalances(vault?.id, {
    includeInactive: false,
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
                  if (quantity?.displayCurrency) {
                    valueOrLiability = new Intl.NumberFormat(
                      undefined,
                      quantity.displayCurrency.NumberFormatOptions,
                    ).format(quantity.displayCurrency.number);
                  }
                  return (
                    <div key={balance.assetId} className="control">
                      <div className="tags has-addons">
                        <span className="tag is-link">
                          {balance?.assetName}
                        </span>
                        {valueOrLiability && (
                          <span className="tag is-dark">
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
