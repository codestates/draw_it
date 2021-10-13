import React, { useRef, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Signup.css';
import { useHistory } from 'react-router-dom';
import { URL } from '../Url';

function Signup({ setIsOpensignup, isOpensignup, scrollStopsignup }) {
  const [user, setuser] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordcheck: '',
  });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleInputValue = (key) => (e) => {
    setuser({ ...user, [key]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const { email, nickname, password, passwordcheck } = user;

    if (password !== passwordcheck) {
      return setMessage('비밀번호가 같지 않습니다');
    }
    if (email.length > 0 && password.length > 0 && nickname.length > 0) {
      axios
        .post(
          `${URL}/user/signup`,
          {
            email: email,
            nickname: nickname,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          history.push('/signin');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage('모든 항목은 필수입니다');
    }
  };

  const backgroundEl = useRef(null);

  const backgroundClickup = (e) => {
    if (e.target === backgroundEl.current) {
      setIsOpensignup(!isOpensignup);
      scrollStopsignup();
    }
  };
  return (
    <div
      onClick={(e) => backgroundClickup(e)}
      ref={backgroundEl}
      className='SignupContainer'
    >
      <div className='SignupContainer_in'>
        <Header />
        <p className='Header-name'>Draw it</p>
        <form>
          <div className='Signup-form'>
            <div>email</div>
            <input
              className='Signup-email'
              type='email'
              onChange={handleInputValue('email')}
              placeholder='email'
            />
          </div>
          <div className='Signup-form'>
            <div>nickname</div>
            <input
              className='Signup-nickname'
              type='text'
              onChange={handleInputValue('nickname')}
              placeholder='nickname'
            />
          </div>
          <div className='Signup-form'>
            <div>password</div>
            <input
              className='Signup-password'
              type='password'
              onChange={handleInputValue('password')}
              placeholder='password'
            />
          </div>
          <div className='Signup-form'>
            <div>password 확인</div>
            <input
              className='Signup-password-check'
              type='password'
              onChange={handleInputValue('passwordcheck')}
              placeholder='password 확인'
            />
          </div>
          <div className='Signup-form'>
            <button className='Signup-btn' type='submit' onClick={handleSignup}>
              회원가입
            </button>
          </div>
          <div className='alert-box'>{message}</div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
