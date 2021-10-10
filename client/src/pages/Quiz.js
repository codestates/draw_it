import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Palette from '../components/palette';
import '../styles/Quiz.css';

const canvasWidth = 900;
const canvasHeight = 600;

const Quiz = () => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const brushRef = useRef();

  const [ctx, setCtx] = useState();
  const [brush, setBrush] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

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
    const image = canvasRef.current.toDataURL('image/png');
    const blob = atob(image.split(',')[1]);

    const array = [];

    for (let i = 0; i < blob.length; i++) {
      array.push(blob.charCodeAt(i));
    }

    const file = new Blob([new Uint8Array(array)], { type: 'image' });
    const formdata = new FormData();
    formdata.append('file', file, '테스트');
    formdata.append('answer', '테스트');

    axios
      .post('http://localhost:4000/post', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        // 이미지 업로드 성공 메인 화면으로 이동
      })
      .catch((error) => {
        // 이미지 업로드 실패
      });
  };

  return (
    <div id="container">
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
        <input className="input" placeholder="문제의 정답을 입력해주세요!" />
        <button className="upload_button" onClick={uploadImage}>
          제출
        </button>
      </div>
    </div>
  );
};

export default Quiz;
