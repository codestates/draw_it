import React from 'react';
import { useHistory } from 'react-router';
import '../styles/Quizheader.css';

const Quizheader = ({ length, testmode }) => {
  const history = useHistory();
  const l = Array(length).fill(1);

  const handleBack = () => {
    history.push('/home');
  };

  return (
    <nav id="header">
      <h1 className="title">Draw it</h1>
      <div className="answer_nav">
        <div className="answer_form">
          <p>정답 글자 수 : </p>
        </div>
        <div className="answer_circle">
          {l.map((_, i) => (
            <div key={i} className="circle" />
          ))}
        </div>
      </div>
      {!testmode && (
        <div className="button" onClick={handleBack}>
          게시판으로 가기
        </div>
      )}
    </nav>
  );
};

export default Quizheader;
