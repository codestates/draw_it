import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Drawit.css';
import Quizheader from '../components/Quizheader';
import { useHistory, useLocation, useParams } from 'react-router';
import { URL } from '../Url';
import Message from '../components/Message';
import Comment from '../components/Comment';

const Quiz = () => {
  const history = useHistory();

  const [token, setToken] = useState(useLocation());
  const [error, setError] = useState();

  const [answer, setAnswer] = useState();
  const postId = useParams();
  const [detailId, setDetailId] = useState(postId);
  const [image, setImage] = useState();
  const [value, setValue] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    axios
      .get(`${URL}/post/${detailId.postId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data.post)
        const detailData = res.data.data.post;
        setAnswer(detailData.answer);
        setImage(detailData.image);
      });

    // To Do PostId 변경하기
    axios
      .get(`${URL}/comment/${postId.postId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setComment(result.data.data);
      });
  }, []);

  const uploadImage = () => {
    if (!answer || answer.length < 2) {
      setError('정답은 2글자 이상이어야 합니다.');
      return;
    }
    /*
    const image = canvasRef.current.toDataURL('image/png');
    const blob = atob(image.split(',')[1]);

    const array = [];

    for (let i = 0; i < blob.length; i++) {
      array.push(blob.charCodeAt(i));
    }

    const file = new Blob([new Uint8Array(array)], { type: 'image' });
    const formdata = new FormData();
    formdata.append('file', file, answer);
    formdata.append('answer', answer);

    axios
      .post(`${URL}/post`, formdata, {
        headers: {
          authorization: `Bearer ${token.state.state}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        // 이미지 업로드 성공 메인 화면으로 이동
        history.push({
          pathname: '/home',
          state: token.state.state,
        });
      })
      .catch((error) => {
        // 이미지 업로드 실패
        setError('정답을 입력해주세요!');
      });
      */
  };

  const changeAnswer = (e) => {
    const { value } = e.target;

    if (value && value.length > 8) {
      setError('정답은 8글자 이하로 입력해주세요!');
      return;
    }
    // setAnswer(value.replace(/ /g, ''));
  };

  const uploadComment = (text) => {
    const { postId } = postId;
    axios
      .post(
        `${URL}/comment/${postId}`,
        { text },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
      });
  };

  console.log(image);

  return (
    <div id="container">
      {error && <Message message={error} setError={setError} />}
      <Quizheader length={answer?.length} />
      <div id="main">
        <div id="canvas">
          <img src={image} />
        </div>
      </div>
      <div className="answer_input_form">
        <input
          className="input"
          placeholder="문제의 정답을 입력해주세요!"
          onChange={changeAnswer}
          // value={answer}
        />
        <div className="upload_button" onClick={uploadImage}>
          정답확인
        </div>
      </div>
      {comment && <Comment comments={comment} uploadComment={uploadComment} />}
    </div>
  );
};

export default Quiz;
