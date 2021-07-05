import React from 'react';
import SelectPaymail from './SelectPaymail';
import SelectAsset from './SelectAsset';
import { Field, Form } from 'react-final-form';
import { fieldIsRequired, useValidators } from '../../utils/validators';

const SendModal = ({ close }) => {
  const onSubmit = (data) => console.log('submitted!', data);

  const validateRequired = useValidators(fieldIsRequired);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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
                <Field
                  name="to"
                  validate={validateRequired}
                  render={({ input, meta }) => (
                    <>
                      <SelectPaymail input={input} />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </>
                  )}
                />
                <SelectAsset />
              </section>
              <footer className="modal-card-foot">
                <button className="button is-success" type="submit">
                  Review
                </button>
                <button className="button" onClick={close}>
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default SendModal;
