import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import SendDialog from './SendDialog';

const SendButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="button is-primary" onClick={() => setOpen(true)}>
        <FormattedMessage
          defaultMessage="Send"
          description="Label for button to open dialog to send instruments"
        />
      </button>
      {open && <SendDialog close={() => setOpen(false)} />}
    </>
  );
};

export default SendButton;
