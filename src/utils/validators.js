// Try a list of validators, and return the first error, or
// undefined if they all pass
export function composeValidators(...validators) {
  return (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );
}

// Any truthy value (so any string other than ''), or any number (including 0)
export const fieldRequired = (value) =>
  value || typeof value === 'number' ? undefined : 'Required';

// Any number, or any string that converts to a number
export const fieldIsNumber = (value) => {
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
  return 'Must be a number';
};

// Anything that converts to a number >= min
export function fieldIsNotLessThan(min) {
  return (value) => {
    // implies must be number
    const errorIfNotNumber = fieldIsNumber(value);
    if (errorIfNotNumber) {
      return errorIfNotNumber;
    }
    if (Number(value) >= Number(min)) {
      return undefined;
    }
    return `Minimum: ${min}`;
  };
}

// Anything that converts to a number <= max
export function fieldIsNotMoreThan(max) {
  return (value) => {
    // implies must be number
    const errorIfNotNumber = fieldIsNumber(value);
    if (errorIfNotNumber) {
      return errorIfNotNumber;
    }
    if (Number(value) <= Number(max)) {
      return undefined;
    }
    return `Maximum: ${max}`;
  };
}

// Anything that converts to a number > min
export function fieldIsMoreThan(min) {
  return (value) => {
    // implies must be number
    const errorIfNotNumber = fieldIsNumber(value);
    if (errorIfNotNumber) {
      return errorIfNotNumber;
    }
    if (Number(value) > Number(min)) {
      return undefined;
    }
    return `Must be greater than ${min}`;
  };
}
export const fieldIsMoreThanZero = fieldIsMoreThan(0);

// Any string of max characters or shorter
export function fieldIsNotLongerThan(max) {
  return (value) => {
    if (typeof value === 'string' && value.length <= max) {
      return undefined;
    }
    return `Must be ${max} characters or fewer`;
  };
}

// Any string of min characters or more
export function fieldIsNotShorterThan(min) {
  return (value) => {
    if (typeof value === 'string' && value.length >= min) {
      return undefined;
    }
    return `Must be ${min} characters or more`;
  };
}

// Any string that _doesn’t_ include a non-alphanumeric character
// Note that this accepts the empty string, and non-strings
export const fieldIsAlphaNumeric = (value) => {
  if (typeof value === 'string' && /[^a-zA-Z0-9 ]/i.test(value)) {
    return 'Only alphanumeric characters allowed';
  }
  return undefined;
};

// Any string that looks like an email address
export const fieldIsEmail = (value) => {
  if (
    typeof value === 'string' &&
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return undefined;
  }
  return 'Must be an email address';
};
