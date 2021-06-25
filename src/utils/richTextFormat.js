import React from 'react';

export const boldText = (chunks) => <strong>{chunks}</strong>;
export const veryImportantText = (chunks) => (
  <span className="has-text-danger has-text-weight-bold">{chunks}</span>
);
