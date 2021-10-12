import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Signup from './Signup';
import '../styles/Signin.css';
import axios from 'axios';
import { URL } from '../Url';
import UserContext from './Context';

function Signin({ setIsOpen, isOpen, scrollStop }) {
  
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  
  const [isOpenSignup, setIsOpenSignup] = useState(false);

  const [message, setMessage] = useState('');
  const history = useHistory();
  const { setToken } = useContext(UserContext);

  const openHandlerSignup = () => {
    setIsOpenSignup(!isOpenSignup);
    scrollStopSignup();
    };

  const scrollStopSignup = () => {
    if (isOpenSignup === false) {
      document.body.style.overflow = "hidden";
      }
    if (isOpenSignup === true) {
      document.body.style.overflow = "unset";
      }
    };
    
  const handleInputValue = (key) => (e) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const handleLogin = (e) => {

    e.preventDefault();
    
    const { email, password } = login;
    // console.log(email, password);
    if (email.length > 0 && password.length > 0) {
      axios
        .post(
          `${URL}/user/signin`,
          { email: email, password: password },
          { withCredentials: true }
        )
        .then((res) => {
        
          const { accessToken } = res.data.data;
        
          localStorage.setItem('token', accessToken);
          setToken(accessToken.slice());
          history.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage('이메일과 비밀번호가 틀렸습니다');
    }
  };

  const backgroundEl = useRef(null);

  const backgroundClick = (e) => {
    if (e.target === backgroundEl.current) {
      setIsOpen(!isOpen);
      scrollStop();
    }
  };
  
  return (
    <div
      onClick={(e) => backgroundClick(e)}
      ref={backgroundEl}
      className='SigninContainer'
    >
      <div className='SigninContainer_in'>
        <Header />
        <p className='Header-name'>Draw it</p>
        <form>
          <div className='Signin-form'>
            <div>email</div>
            <input
              className='Signin-email'
              type='email'
              onChange={handleInputValue('email')}
              placeholder='email'
            />
          </div>
          <div className='Signin-form'>
            <div>password</div>
            <input
              className='Signin-password'
              type='password'
              onChange={handleInputValue('password')}
              placeholder='password'
            />
          </div>
          <div className='Signin-form'>
            <button className='Signin-btn' type='submit' onClick={handleLogin}>
              로그인
            </button>
          </div>
             <span className="Signin-span" onClick={openHandlerSignup} >회원가입</span>
        </form>
        <div className='Signin-alert-box'>{message}</div>
      </div>
      {isOpenSignup ? (
      <Signup
        scrollStopsignup={scrollStopSignup}
        setIsOpensignup={setIsOpenSignup}
        isOpensignup={isOpenSignup}
      />
) : null}
    </div>
  );
}
export default Signin;
