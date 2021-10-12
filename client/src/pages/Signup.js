import React,{useRef, useState} from "react"
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Signup.css"
import { useHistory } from "react-router";
import { URL } from '../Url';

function Signup({ setIsOpensignup, isOpensignup, scrollStopsignup }) {
  const [user, setuser] =useState({
    email: '',
    nickname: '',
    password: '',
    passwordcheck: ''
  });
  const [error , setError] = useState('');
  const history = useHistory();

  const handleInputValue = (key) => (e) => {
    setuser({ ...user, [key]: e.target.value });
  };


  const handlesignup =() => {
    const { email, nickname, password , passwordcheck } =user;

    if (password !== passwordcheck){
      return setError("비밀번호가 맞지않습니다")
    }
    if ( email.length > 0 && password.length > 0 && nickname.length > 0 ) 
    {
      axios.post(`${URL}/user/signup`, {
        email: email,
        nickname: nickname,
        password: password
      },
      { withCredentials: true}
      )
      .then((res) =>{ 
        const token = res.data.data.accessToken;
        
        history.push({
          pathname : '/signin',
          state : token
        });  
        // history.push('/home')
      }).catch(err=>{
        console.log(err)
      });
    } else {
      setError("모든 항목은 필수입니다");
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
        className="SignupContainer"
      >
        <div className="SignupContainer_in">
          <Header />
          <p className="Header-name">Draw it</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='Signup-form'>
              <div>email</div>
                <input className="Signup-email" type='email' onChange={handleInputValue('email')} placeholder="email"/>
            </div>
            <div className='Signup-form'>
              <div>nickname</div>
                <input className="Signup-nickname" type='text' onChange={handleInputValue('nickname')} placeholder="nickname"/>
            </div>
            <div className='Signup-form'>
              <div>password</div>
                <input className="Signup-password" type='password' onChange={handleInputValue('password')} placeholder="password"/>
            </div>
            <div className='Signup-form'>
              <div>password 확인</div>
                <input className="Signup-password-check" type='password' onChange={handleInputValue('passwordcheck')} placeholder="password 확인"/>
            </div>
            <div className='Signup-form'>
              <button className="Signup-btn" type='submit' onClick={handlesignup} >
                회원가입
              </button>
              
            </div>
            <div className='alert-box'>{error}</div>
          </form>
          <Footer />
        </div>
      </div>
  )
}
export default Signup;