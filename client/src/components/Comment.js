import React, { useRef, useState } from 'react';
import '../styles/Comment.css';

const Comment = ({ comments, uploadComment }) => {
  const [text, setText] = useState();
  const inputRef = useRef();

  const changeText = () => {
    setText(inputRef.current.value);
  };

  const handleUpload = () => {
    uploadComment(text.slice(0, 24));
    inputRef.current.value = '';
    setText('');
  };

  return (
    <div id="Container">
      <h2 className="title">코멘트 리스트</h2>
      <div className="comment_input_form">
        <input
          ref={inputRef}
          className="comment_input"
          placeholder="댓글을 입력해주세요!"
          onChange={changeText}
        />
        <div className="comment_button" onClick={handleUpload}>
          확인
        </div>
      </div>
      <ul className="comment_list">
        {comments?.map((comment) => {
          return (
            <li key={comment.id} className="comment">
              <span className="nickname">{comment.User.nickname}</span>
              <span>{comment.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comment;
