import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Palette from '../components/Palette';
import '../styles/Drawit.css';
import Quizheader from '../components/Quizheader';
import { useHistory, useLocation, useParams } from 'react-router';
import { URL } from '../Url';
import Message from '../components/Message';

const canvasWidth = 900;
const canvasHeight = 600;

const Quiz = () => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const brushRef = useRef();

  const history = useHistory();

  const [token, setToken] = useState(useLocation());
  const [error, setError] = useState();

  const [ctx, setCtx] = useState();
  const [brush, setBrush] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [answer, setAnswer] = useState();
  const postId = useParams()
  const [detailId, setDetailId] = useState(postId)
  const [image, setImage] = useState()
  const [value, setValue] = useState()
  useEffect(() => {
    axios.get(`${URL}/post/${detailId.postId}`,{
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res)=>{
      // console.log(res.data.data.post)
      const detailData = res.data.data.post
      setAnswer(detailData.answer)
      setImage(detailData.image)
    })
    
    
  }, []);

  const uploadImage = () => {
    if (!answer || answer.length < 2) {
      setError('정답은 2글자 이상이어야 합니다.');
      return;
    }

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
  };

  const changeAnswer = (e) => {
    const { value } = e.target;

    if (value && value.length > 8) {
      setError('정답은 8글자 이하로 입력해주세요!');
      return;
    }
    // setAnswer(value.replace(/ /g, ''));
  };

  return (
    <div id="container">
      {error && <Message message={error} setError={setError} />}
      <Quizheader length={answer?.length} />
      <div id="main">
        <div id="canvas">
          <div ref={brushRef} id="brush" />
          <img src ={image} />
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
    </div>
  );
};

export default Quiz;
