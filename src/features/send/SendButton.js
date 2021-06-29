import React, { useState } from 'react';
import SendModal from './SendModal';

const SendButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="button is-light" onClick={() => setOpen(true)}>
        Send
      </button>
      {open && <SendModal close={() => setOpen(false)} />}
    </>
  );
};

export default SendButton;
