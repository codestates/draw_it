import React, { useRef, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Signin from './Signin';
import '../styles/Signup.css';
import { useHistory } from 'react-router-dom';
import Message from '../components/Message';
import { URL } from '../Url';

function Signup({ setIsOpenSignup, isOpenSignup, scrollStopSignup }) {
  const [user, setuser] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  const [nickMessage, setNickMessage] = useState();
  const [passWordMessage, setPassWordMessage] = useState();
  const [emailMessage, setEmailMessage] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const handleInputValue = (key) => (e) => {
    setuser({ ...user, [key]: e.target.value });
  };

  const openHandlerSignin = () => {
    setIsOpenSignin(!isOpenSignin);
    scrollStopSignin();
  };

  const scrollStopSignin = () => {
    if (isOpenSignin === false) {
      document.body.style.overflow = 'hidden';
    }
    if (isOpenSignin === true) {
      document.body.style.overflow = 'unset';
    }
  };

  const validateNickname = (nickname) => {
    const min = 1;
    const regNickname = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9a-z]+$/;

    // 이름 길이 확인
    if (nickname.length < min) {
      setNickMessage('1자 이상 입력해주세요');
      return false;
    }

    // 이름 정규식 확인
    if (!regNickname.test(nickname)) {
      setNickMessage('한글 / 영문 소문자 / 숫자만 허용합니다');
      return false;
    } else {
      setNickMessage();
      return true;
    }
  };

  const validateEmail = (email) => {
    const regEmail = /^[0-9a-z-_.]+@[0-9a-z]+\.[0-9a-z]+$/;

    if (email.length === 0) {
      setEmailMessage('1자 이상 입력해주세요');
    } else if (!regEmail.test(email)) {
      setEmailMessage('특수문자(-_.) 또는 이메일형식(@) 필요합니다');
      return false;
    } else {
      setEmailMessage();
      return true;
    }
  };

  const validatePassword = (password, passwordCheck) => {
    const min = 4;
    const max = 20;
    const regPassword = /^[0-9a-z-_.!?*]+$/;

    if (password !== passwordCheck) {
      setPassWordMessage('동일한 비밀번호를 입력해 주세요');
      return false;
    }

    // 비밀번호 길이 확인
    if (password.length < min || password.length > max) {
      setPassWordMessage('비밀번호 4~20자 입니다');
      return false;
    }

    // 비밀번호 정규식 확인
    if (!regPassword.test(password)) {
      setPassWordMessage('영문 소문자/숫자/특수문자(-_.!?*)만 허용합니다');
      return false;
    } else {
      setPassWordMessage('');
      return true;
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { email, nickname, password, passwordCheck } = user;

    const validNickname = validateNickname(nickname);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password, passwordCheck);

    if (validNickname & validEmail & validPassword) {
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
          setIsSignup(true);
          setError('회원가입에 성공했습니다!')
          setTimeout(() => {
            history.push('/');
          }, 1000);
        })
        .catch((err) => {
          setEmailMessage('이메일이 중복됩니다');
        });
    }
  };

  const backgroundEl = useRef(null);

  const backgroundClick = (e) => {
    if (e.target === backgroundEl.current) {
      setIsOpenSignup(!isOpenSignup);
      scrollStopSignup();
    }
  };

  return (
    <div
      onClick={(e) => backgroundClick(e)}
      ref={backgroundEl}
      className='SignupContainer'
    >
      
      {isSignup ? 
        error && <Message message={error} setError={setError} />
       : (
        <div className='SignupContainer_in'>
          <Header />
          <p className='Header-name'>Draw it</p>
          <form>
            <div className='Signup-form'>
              <div>email</div>
              <input
                className={emailMessage ? "change-email" : "Signup-email"}
                type='email'
                onChange={handleInputValue('email')}
                placeholder='email'
              />
            </div>
            <div className='Signup-email-alert-box'>{emailMessage}</div>
            <div className='Signup-form'>
              <div>nickname</div>
              <input
                className={nickMessage ? "change-nickname" :"Signup-nickname"}
                type='text'
                onChange={handleInputValue('nickname')}
                placeholder='nickname'
              />
            </div>
            <div className='Signup-nickname-alert-box'>{nickMessage}</div>
            <div className='Signup-form'>
              <div>password</div>
              <input
                className={passWordMessage ? "change-password":"Signup-password"}
                type='password'
                onChange={handleInputValue('password')}
                placeholder='password'
              />
            </div>
            <div className='Signup-password-alert-box'>{passWordMessage}</div>
            <div className='Signup-form'>
              <div>password check</div>
              <input
                className={passWordMessage ? "change-password" : "Signup-password-check"}
                type='password'
                onChange={handleInputValue('passwordCheck')}
                placeholder='password 확인'
              />
            </div>
            <div className='Signup-form'>
              <button
                className='Signup-btn'
                type='submit'
                onClick={handleSignup}
              >
                회원가입
              </button>
            </div>

            <span className='Signup-span' onClick={openHandlerSignin}>
              로그인
            </span>
          </form>
        </div>
      )}

      
    </div>
  );
}
export default Signup;
