import React,{useRef, useState} from "react"
import axios from 'axios';
import Header from "../components/Header";
import Signin from "./Signin";
import "../styles/Signup.css"
import { useHistory } from "react-router-dom";
import { URL } from '../Url';

function Signup({ setIsOpenSignup, isOpenSignup, scrollStopSignup }) {
  const [user, setuser] =useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: ''
  });
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  const [message , setMessage] = useState('');
  const [nickMessage, setNickMessage] = useState('');
  const [passWordMessage, setPassWordMessage] =useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isSignup, setIsSignup] =useState(false);
  const history = useHistory();

  const handleInputValue = (key) => (e) => {
    setuser({ ...user, [key]: e.target.value });
  };

  const openHandlerSignin =() =>{
    setIsOpenSignin(!isOpenSignin);
    scrollStopSignin();
    // history.push('/Signin')
  }

  const scrollStopSignin = () => {
    if (isOpenSignin === false) {
    document.body.style.overflow = "hidden";
    }
    if (isOpenSignin === true) {
    document.body.style.overflow = "unset";
    }
  };

  const validateNickname = (nickname) => {
    const min = 1;
    const regNickname = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9a-z]+$/;

    // 이름 길이 확인
    if (nickname.length < min) {
      setNickMessage('1자 이상 입력');
      return false;
    }

    // 이름 정규식 확인
    if (!regNickname.test(nickname)) {
      setNickMessage('한글 / 영문 소문자 / 숫자만 허용');
      return false;
    } else {
      setNickMessage('');
      return true;
    }
  };

  const validateEmail = (email) => {
    const regEmail = /^[0-9a-z-_.]+@[0-9a-z]+\.[0-9a-z]+$/;

    if (email.length === 0) {
      setEmailMessage('1자 이상 입력');
    } else if (!regEmail.test(email)) {
      setEmailMessage('영문 소문자 / 숫자 / 특수문자(-_.)만 허용');
      return false;
    } else {
      setEmailMessage('');
      return true;
    }
  };

  const validatePassword = (password, passwordCheck) => {
    if (passwordCheck.length === 0) {
      setPassWordMessage('동일한 비밀번호를 입력해 주세요');
    } else if (password !== passwordCheck) {
      setPassWordMessage('동일한 비밀번호를 입력해 주세요');
      return false;
    }

    const min = 8;
    const max = 20;
    const regPassword = /^[0-9a-z-_.!?*]+$/;

    // 비밀번호 길이 확인
    if (password.length < min || password.length > max) {
      setPassWordMessage('8~20자 입력');
      return false;
    }

    // 비밀번호 정규식 확인
    if (!regPassword.test(password)) {
      setPassWordMessage('영문 소문자 / 숫자 / 특수문자(-_.!?*)만 허용');
      return false;
    } else {
      setPassWordMessage('');
      return true;
    }
  };

  const handleSignup =(e) => {
    e.preventDefault();
    const { email, nickname, password , passwordCheck } =user;

    const validNickname = validateNickname(nickname);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password, passwordCheck);
    

    if ( validNickname & validEmail & validPassword ) 
    {
      axios.post(`${URL}/user/signup`, {
        email: email,
        nickname: nickname,
        password: password
      },
      { withCredentials: true}
      )
      .then((res) =>{
        setIsSignup(true); 
        setTimeout(() => {
          history.push('/signin');
        }, 1000);
      }).catch((err)=>{
        setEmailMessage("이메일이 중복됩니다");
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
        className="SignupContainer"
      >
        {isSignup ? (
          <div className="Signup-success">회원가입에 성공했습니다!</div>)
          :(
        <div className="SignupContainer_in">
          <Header />
          <p className="Header-name">Draw it</p>
          <form >
            <div className='Signup-form'>
              <div>email</div>
                <input className="Signup-email" type='email' onChange={handleInputValue('email')} placeholder="email"/>
            </div>
            <div className='Signup-email-alert-box'>{emailMessage}</div>
            <div className='Signup-form'>
              <div>nickname</div>
                <input className="Signup-nickname" type='text' onChange={handleInputValue('nickname')} placeholder="nickname"/>
            </div>
            <div className='Signup-nickname-alert-box'>{nickMessage}</div>
            <div className='Signup-form'>
              <div>password</div>
                <input className="Signup-password" type='password' onChange={handleInputValue('password')} placeholder="password"/>
            </div>
            <div className='Signup-form'>
              <div>password check</div>
                <input className="Signup-password-check" type='password' onChange={handleInputValue('passwordcheck')} placeholder="password 확인"/>
            </div>
            <div className='Signup-password-alert-box'>{passWordMessage}</div>
            <div className='Signup-form'>
              <button className="Signup-btn" type='submit' onClick={handleSignup} >
                회원가입
              </button>
            </div>
            
            <span className="Signup-span" onClick={openHandlerSignin} >로그인</span>
          </form>
        </div>
        )}
        {isOpenSignin ? (
      <Signin
        scrollStop={scrollStopSignin}
        setIsOpen={setIsOpenSignin}
        isOpen={isOpenSignin}
      />
      ) : null}
      
      </div>
  )
}
export default Signup;