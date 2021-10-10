import React from 'react';
import '../styles/Quizheader.css';

const Quizheader = () => {
  return (
    <nav id="header">
      <h1 className="title">Draw it</h1>
      <div className="answer_nav">
        <div className="answer_form">
          <p>정답 글자 수 : </p>
        </div>
        <div className="answer_circle">
          <div className="circle" />
        </div>
      </div>
    </nav>
  );
};

export default Quizheader;
