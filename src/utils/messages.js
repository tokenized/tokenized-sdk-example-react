export const findMessage =
  (...messages) =>
  (text) =>
    messages.find(({ props: { defaultMessage } }) => defaultMessage == text);
