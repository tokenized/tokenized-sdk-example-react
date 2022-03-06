import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import {
  useInstrumentWithDetails,
  usePrimaryVault,
  useFilteredBalances,
} from '@tokenized/sdk-react-private';
import { Instrument } from '@tokenized/sdk-js-private';
import {
  useValidators,
  fieldIsRequired,
  fieldIsNumber,
  fieldIsMoreThanZero,
  makeFieldIsNotMoreThan,
} from '../../utils/validators';

export default function InstrumentAmountFormField({
  name = 'amount',
  instrumentId,
  disabled,
  notConstrainedByBalance,
}) {
  const intl = useIntl();

  let instrument = useInstrumentWithDetails({ instrumentId });
  const vaultId = usePrimaryVault()?.id;
  const instrumentBalances = useFilteredBalances({
    vaultId,
    includeInactive: false,
  });
  const balance =
    instrument.hasDetails &&
    instrumentBalances?.data?.find?.(
      (balance) => balance.instrumentId === instrument.instrumentId,
    );
  if (!balance) {
    disabled = true;
  }
  instrument = instrument.withQuantity(balance?.quantities?.available);

  let quantitySymbol = instrument.formatAmountUnits();
  const parseAmount = (input) =>
    instrument.parseEditableAmount(input, { roundAmountToQuantity: true });
  const [amountEdit, setAmountEdit] = useState();

  const quantityIsNotMoreThanAvailable = useMemo(
    () => makeFieldIsNotMoreThan(instrument.amount),
    [instrument.amount],
  );
  const validateQuantity = useValidators(
    fieldIsRequired,
    fieldIsNumber,
    fieldIsMoreThanZero,
    notConstrainedByBalance ? undefined : quantityIsNotMoreThanAvailable,
  );

  return (
    <Field
      name={name}
      format={Instrument.formatEditableAmount}
      validate={validateQuantity}
    >
      {({ input, meta }) => (
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              disabled={disabled}
              type="text"
              className={classNames(
                'input',
                meta.touched && meta.error && 'is-danger',
              )}
              placeholder={intl.formatMessage({
                defaultMessage: 'Enter amount',
                description: 'Instrument amount input field placeholder',
              })}
              {...input}
              value={meta.active ? amountEdit : input.value}
              onChange={(event) => {
                const newValue = event?.target?.value;
                setAmountEdit(newValue);
                const newAmount = parseAmount(newValue);
                input.onChange(newAmount);
              }}
              onFocus={(event) => {
                setAmountEdit(input.value);
                input.onFocus(event);
              }}
            />
            {meta.touched && meta.error && (
              <p className="help is-danger">{meta.error}</p>
            )}
          </div>
          {!disabled && (
            <div className="control">
              <span className="button is-static">{quantitySymbol}</span>
            </div>
          )}
        </div>
      )}
    </Field>
  );
}
