import React, { useRef, useState } from 'react';
import '../styles/Quiz.css';
import Quizheader from '../components/Quizheader';
import Message from '../components/Message';
import { testImage } from '../Url';

const Test = () => {
  const inputRef = useRef();
  const [modal, setModal] = useState();
  const [current, setCurrent] = useState(0);

  const goHome = () => {
    const { value } = inputRef.current;
    switch (current) {
      case 0:
        if (value === '호박') {
          setCurrent(1);
          setModal('정답입니다!');
        } else {
          setModal('아쉽지만 틀렸네요 다시 생각해보세요!');
        }
        break;
      case 1:
        if (value === '딸기') {
          setCurrent(2);
          setModal('정답입니다! 로그인 페이지로 이동!');
        } else {
          setModal('아쉽지만 틀렸네요 다시 생각해보세요!');
        }
        break;
      default:
    }
    inputRef.current.value = '';
  };

  return (
    <div id="container">
      {modal && (
        <Message
          message={modal}
          setError={setModal}
          testmode={current === 2 ? true : false}
        />
      )}
      <Quizheader length={2} testmode={true} />
      <div id="main">
        <div id="canvas">
          <img
            className="canvas-img"
            src={current < 2 ? testImage[current] : testImage[1]}
            alt="이미지"
          />
        </div>
      </div>
      <div className="answer_input_form">
        <input
          ref={inputRef}
          className="input"
          placeholder="문제의 정답을 입력해주세요!"
        />
        <div className="upload_button" onClick={goHome}>
          정답확인
        </div>
      </div>
    </div>
  );
};

export default Test;
