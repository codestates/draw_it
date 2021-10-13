import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Useredit.css';
import axios from 'axios';
import { URL } from '../Url';
import UserContext from './Context';

function Useredit({ setIsOpen, isOpen, scrollStop }) {
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [edit, setEdit] = useState({
    nickname: '',
    password: '',
    passwordcheck: '',
  });

  const handleInputValue = (key) => (e) => {
    setEdit({ ...edit, [key]: e.target.value });
  };

  const backgroundEl = useRef(null);

  const backgroundClick = (e) => {
    if (e.target === backgroundEl.current) {
      setIsOpen(!isOpen);
      scrollStop();
    }
  };

  const handleSubmit = (e) => {
    console.log('hello world');
    e.preventDefault();

    const { nickname } = edit;

    axios
      .put(
        `${URL}/user/mypage`,
        {
          nickname: nickname,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => {
        history.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      onClick={(e) => backgroundClick(e)}
      ref={backgroundEl}
      className='UsereditContainer'
    >
      <div className='UsereditContainer_in'>
        <Header />
        <p className='Header-name'>Draw it</p>
        <form>
          <div className='Useredit-form'>
            <div>nickname</div>
            <input
              className='Useredit-email'
              type='nickname'
              onChange={handleInputValue('nickname')}
              placeholder='nickname'
            />
          </div>
          <div className='Useredit-form'>
            <div>password</div>
            <input
              className='Useredit-password'
              type='password'
              onChange={handleInputValue('password')}
              placeholder='password'
            />
          </div>
          <div className='Useredit-form'>
            <div>password check</div>
            <input
              className='Useredit-password'
              type='password'
              onChange={handleInputValue('password check')}
              placeholder='password check'
            />
          </div>
          <div className='Useredit-form'>
            <button
              className='Useredit-btn'
              type='submit'
              onClick={handleSubmit}
            >
              수정 완료
            </button>
          </div>
          <div className='Useredit-alert-box-red'>{message}</div>
        </form>
      </div>
    </div>
  );
}

export default Useredit;