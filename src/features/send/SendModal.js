import React from 'react';
import SelectPaymail from './SelectPaymail';

const SendModal = ({ close }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Send</p>
          <button
            className="delete"
            aria-label="close"
            onClick={close}
          ></button>
        </header>
        <section
          className="modal-card-body"
          style={{ minHeight: 'calc(50vh)' }}
        >
          <SelectPaymail />
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button" onClick={close}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SendModal;
