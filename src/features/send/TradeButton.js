import React, { useState } from 'react';
import TradeModal from './TradeModal';

export default function TradeButton({ mode, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="button is-primary" onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && <TradeModal mode={mode} close={() => setOpen(false)} />}
    </>
  );
}
