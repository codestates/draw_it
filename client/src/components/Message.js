import React from 'react';
import { useHistory } from 'react-router';
import '../styles/Message.css';

const Message = ({ message, setError, testmode }) => {
  const history = useHistory();
  const closeModal = () => {
    setError();
    if (testmode) {
      history.push('/');
    }
  };
  return (
    <section onClick={closeModal} className="modal_background">
      <div onClick={(e) => e.stopPropagation()} className="modal_container">
        <span onClick={closeModal} className="modal_close">
          x
        </span>
        <span className="message">{message}</span>
      </div>
    </section>
  );
};

export default Message;
