import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/Quiz.css';
import Quizheader from '../components/Quizheader';
import { useParams } from 'react-router';
import { URL } from '../Url';
import Message from '../components/Message';
import Comment from '../components/Comment';

const Quiz = ({ token }) => {
  const containerRef = useRef();
  const [error, setError] = useState();
  const postId = useParams();
  const [detailId, setDetailId] = useState(postId);
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    axios
      .get(`${URL}/post/${detailId.postId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const detailData = res.data.data;
        setData(detailData);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/comment/${postId.postId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        const { data: comment } = result.data;
        setComment(comment);

        if (comment) {
          containerRef.current.style.overflowY = 'scroll';
        }
      });
  }, []);

  const changeAnswer = (e) => {
    setValue(e.target.value);

    if (value && value.length > 8) {
      setError('정답은 8글자 이하로 입력해주세요!');
      return;
    }
  };

  const uploadComment = (text) => {
    axios
      .post(
        `${URL}/comment/${postId.postId}`,
        { text },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        const { data } = result.data;
        setComment([...comment, data]);
      });
  };

  const answerCheck = () => {
    axios
      .post(
        `${URL}/post/${postId.postId}`,
        {
          answer: value,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        if (result.data.passed === 0) {
          setError('정답입니다 ~ !');
          setData({ ...data, isPassed: true });
        } else if (result.data.passed === 2) {
          setError('이미 정답을 맞힌 문제입니다.');
        } else {
          setError('틀렸습니다~!');
        }
        setValue('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="container" ref={containerRef}>
      {error && <Message message={error} setError={setError} />}
      <Quizheader length={data?.post.answer?.length} />
      <div id="main">
        <div id="canvas">
          <img className="canvas-img" src={data?.post.image} />
        </div>
      </div>
      <div className="answer_input_form">
        <input
          className="input"
          placeholder="문제의 정답을 입력해주세요!"
          onChange={changeAnswer}
          value={value}
        />
        <div className="upload_button" onClick={answerCheck}>
          정답확인
        </div>
      </div>
      {comment && data?.isPassed && (
        <Comment comments={comment} uploadComment={uploadComment} />
      )}
    </div>
  );
};

export default Quiz;
