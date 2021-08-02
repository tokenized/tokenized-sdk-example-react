import { useCallback } from 'react';
import { useIntl } from 'react-intl';

export function useValidators(...validators) {
  const intl = useIntl();
  return useCallback(
    // Try a list of validators (passing intl as the first
    // aeg to each one), and return the first error, or
    // undefined if they all pass
    (...validateArgs) =>
      validators.reduce(
        (error, validator) => error || validator(intl, ...validateArgs),
        undefined,
      ),
    [intl, validators],
  );
}

// Any truthy value (so any string other than ''), or any number (including 0)
export const fieldIsRequired = (intl, value) =>
  value || typeof value === 'number'
    ? undefined
    : intl.formatMessage({
        defaultMessage: 'Required',
        description: 'Form field validation failure: a value is required',
        id: 'gHRR9x',
      });

// Any number, or any string that converts to a number
export const fieldIsNumber = (intl, value) => {
  if (typeof value === 'number') {
    return undefined;
  }
  if (
    typeof value === 'string' &&
    value !== '' &&
    !Number.isNaN(Number(value))
  ) {
    return undefined;
  }
  return intl.formatMessage({
    defaultMessage: 'Must be a number',
    description: 'Form field validation failure: a number is required',
    id: 'KByFkD',
  });
};

// Anything that converts to a number >= min
export function makeFieldIsNotLessThan(min) {
  return (intl, value) => {
    // implies must be number
    const errorIfNotNumber = fieldIsNumber(intl, value);
    if (errorIfNotNumber) {
      return errorIfNotNumber;
    }
    if (Number(value) >= Number(min)) {
      return undefined;
    }
    return intl.formatMessage(
      {
        defaultMessage: 'Minimum: {min, number}',
        description: 'Form field validation failure: number >= min is required',
        id: 'zolMCa',
      },
      { min },
    );
  };
}

// Anything that converts to a number <= max
export function makeFieldIsNotMoreThan(max) {
  return (intl, value) => {
    // implies must be number
    const errorIfNotNumber = fieldIsNumber(intl, value);
    if (errorIfNotNumber) {
      return errorIfNotNumber;
    }
    if (Number(value) <= Number(max)) {
      return undefined;
    }
    return intl.formatMessage(
      {
        defaultMessage: 'Maximum: {max}',
        description: 'Form field validation failure: number <= max is required',
        id: '/zXPuJ',
      },
      { max: `${max}` },
    );
  };
}

// Anything that converts to a number > min
export function makeFieldIsMoreThan(min) {
  return (intl, value) => {
    // implies must be number
    const errorIfNotNumber = fieldIsNumber(intl, value);
    if (errorIfNotNumber) {
      return errorIfNotNumber;
    }
    if (Number(value) > Number(min)) {
      return undefined;
    }
    return intl.formatMessage(
      {
        defaultMessage: 'Must be greater than {min, number}',
        description: 'Form field validation failure: number > min is required',
        id: 'Ssp7dT',
      },
      { min },
    );
  };
}
export const fieldIsMoreThanZero = makeFieldIsMoreThan(0);

// Any string of max characters or shorter
export function makeFieldIsNotLongerThan(max) {
  return (intl, value) => {
    if (typeof value === 'string' && value.length <= max) {
      return undefined;
    }
    return intl.formatMessage(
      {
        defaultMessage: 'Must be {max, number} characters or fewer',
        description:
          'Form field validation failure: max characters or fewer required',
        id: 'uN85Mi',
      },
      { max },
    );
  };
}

// Any string of min characters or more
export function makeFieldIsNotShorterThan(min) {
  return (intl, value) => {
    if (typeof value === 'string' && value.length >= min) {
      return undefined;
    }
    return intl.formatMessage(
      {
        defaultMessage: 'Must be {min, number} characters or more',
        description:
          'Form field validation failure: min characters or more required',
        id: 'sChJWn',
      },
      { min },
    );
  };
}

// Any string that _doesn’t_ include a non-alphanumeric character
// Note that this accepts the empty string, and non-strings
export const fieldIsAlphaNumeric = (intl, value) => {
  if (typeof value === 'string' && /[^a-zA-Z0-9 ]/i.test(value)) {
    return intl.formatMessage({
      defaultMessage: 'Only alphanumeric characters allowed',
      description:
        'Form field validation failure: alphanumeric string is required',
      id: 'xlJ5FF',
    });
  }
  return undefined;
};

// Any string that looks like an email address
export const fieldIsEmail = (intl, value) => {
  if (
    typeof value === 'string' &&
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return undefined;
  }
  return intl.formatMessage({
    defaultMessage: 'Must be an email address',
    description:
      'Form field validation failure: valid email address is required',
    id: 'BQRMqg',
  });
};
