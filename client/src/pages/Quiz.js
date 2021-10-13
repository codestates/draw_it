import React, { useContext,useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/Quiz.css';
import Quizheader from '../components/Quizheader';
import { useHistory, useParams } from 'react-router';
import { URL } from '../Url';
import Message from '../components/Message';
import Comment from '../components/Comment';
import UserContext from './Context';


const Quiz = () => {
  const history = useHistory();

  const { token, setToken } = useContext(UserContext);
  const [error, setError] = useState();

  const [answer, setAnswer] = useState();
  const postId = useParams()
  const [detailId, setDetailId] = useState(postId)
  const [image, setImage] = useState()
  const [value, setValue] = useState()
  const [comment, setComment] = useState();
  
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
    
        // To Do PostId 변경하기
    axios.get(`${URL}/comment/${1}`).then((result) => {
      setComment(result.data.data);
    });
  }, []);
   

  const changeAnswer = (e) => {
    const { value } = e.target;

    if (value && value.length > 8) {
      setError('정답은 8글자 이하로 입력해주세요!');
      return;
    }
    // setAnswer(value.replace(/ /g, ''));
  };

  const uploadComment = (text) => {
    // To Do PostId 변경하기
    // axios.post(`${URL}/comment/${1}`,{text},{
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   }
    // }).then((result) => {
    //   result
    // })
  };

  return (
    <div id="container">
      {error && <Message message={error} setError={setError} />}
      <Quizheader length={answer?.length} />
      <div id="main">
        <div id="canvas">
          <img className="canvas-img" src ={image} />
        </div>
      </div>
      <div className="answer_input_form">
        <input
          className="input"
          placeholder="문제의 정답을 입력해주세요!"
          onChange={changeAnswer}
          // value={answer}
        />
        <div className="upload_button">
          정답확인
        </div>
      </div>
      {comment && <Comment comments={comment} uploadComment={uploadComment} />}
    </div>
  );
};

export default Quiz;
