import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Palette from '../components/Palette';
import '../styles/Drawit.css';
import Quizheader from '../components/Quizheader';
import { useHistory } from 'react-router';
import { URL } from '../Url';
import Message from '../components/Message';
import UserContext from './Context';

const canvasWidth = 900;
const canvasHeight = 600;

const Drawit = () => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const brushRef = useRef();

  const history = useHistory();

  const { token } = useContext(UserContext);
  const [error, setError] = useState();

  const [ctx, setCtx] = useState();
  const [brush, setBrush] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [answer, setAnswer] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    ctxRef.current = context;

    brushRef.current.style.pointerEvents = 'none';
    brushRef.current.style.backgroundColor = 'black';

    setCtx(context);
    setBrush(brushRef.current);
  }, []);

  const startPainting = () => {
    setIsDrawing(true);
  };

  const stopPainting = () => {
    setIsDrawing(false);
  };

  const onDrawing = ({ nativeEvent }) => {
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;

    brush.style.top = nativeEvent.clientY - ctx.lineWidth / 2 + 'px';
    brush.style.left = nativeEvent.clientX - ctx.lineWidth / 2 + 'px';
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const changeLineWidth = (event) => {
    ctx.lineWidth = event.target.value;
    brush.style.padding = event.target.value / 2 + 'px';
  };

  const getColor = (ele) => {
    return getComputedStyle(ele).backgroundColor;
  };

  const changeBrushColor = ({ nativeEvent }) => {
    const color = getColor(nativeEvent.target);
    ctx.strokeStyle = color;
    brush.style.backgroundColor = color;
  };

  const fillCanvas = () => {
    ctx.fillStyle = brush.style.backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

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
          authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        // 이미지 업로드 성공 메인 화면으로 이동
        history.push('/home');
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
    setAnswer(value.replace(/ /g, ''));
  };

  return (
    <div id="container">
      {error && <Message message={error} setError={setError} />}
      <Quizheader length={answer?.length || 0} />
      <div id="main">
        <div id="canvas">
          <div ref={brushRef} id="brush" />
          <canvas
            ref={canvasRef}
            className="canvas"
            onMouseDown={startPainting}
            onMouseUp={stopPainting}
            onMouseMove={onDrawing}
            onMouseLeave={stopPainting}
          />
        </div>
        <Palette
          changeLineWidth={changeLineWidth}
          changeBrushColor={changeBrushColor}
          fillCanvas={fillCanvas}
        />
      </div>
      <div className="answer_input_form">
        {token && (
          <>
            <input
              className="input"
              placeholder="문제의 정답을 입력해주세요!"
              onChange={changeAnswer}
              value={answer || ''}
            />
            <div className="upload_button" onClick={uploadImage}>
              제출
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Drawit;
