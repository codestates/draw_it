import React, { useState } from 'react';
import '../styles/Comment.css';

const Comment = ({ comments, uploadComment }) => {
  const [text, setText] = useState();

  const changeText = (e) => {
    setText(e.target.value);
  };

  const handleUpload = () => {
    uploadComment(text.slice(0, 24));
    setText('');
  };

  console.log(comments);
  return (
    <div id="Container">
      <h2 className="title">코멘트 리스트</h2>
      <div className="comment_input_form">
        <input
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
              <span className="nickname">닉네임</span>
              <span>{comment.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comment;
