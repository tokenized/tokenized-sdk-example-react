import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import SendModal from './SendModal';

const SendButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="button is-light" onClick={() => setOpen(true)}>
        <FormattedMessage
          defaultMessage="Send"
          description="Label for button to open dialog to send assets"
          id="Qt4tZb"
        />
      </button>
      {open && <SendModal close={() => setOpen(false)} />}
    </>
  );
};

export default SendButton;
