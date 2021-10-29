import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import TradeModal from './TradeModal';

export default function TradeButton({ mode, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="button is-light" onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && <TradeModal mode={mode} close={() => setOpen(false)} />}
    </>
  );
}
