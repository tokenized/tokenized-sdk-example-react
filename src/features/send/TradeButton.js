import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import TradeModal from './TradeModal';

export default function TradeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="button is-light" onClick={() => setOpen(true)}>
        <FormattedMessage
          defaultMessage="Trade"
          description="Label for button to open dialog to trade assets"
        />
      </button>
      {open && <TradeModal close={() => setOpen(false)} />}
    </>
  );
}
