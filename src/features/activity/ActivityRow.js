import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

export default function ActivityRow({ item }) {
  return (
    <tr style={{ whiteSpace: 'nowrap' }}>
      <td>{JSON.stringify(item)}</td>
    </tr>
  );
}
