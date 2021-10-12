import React from 'react';
import '../styles/Message.css';

const Message = ({ message, setError }) => {
  const closeModal = (e) => {
    setError();
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
