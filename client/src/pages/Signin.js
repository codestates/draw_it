import React,{useRef , useState}  from "react"
// import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Signin.css"
import axios from "axios";

function Signin({ setIsOpen, isOpen, scrollStop}) {

  const [login, setLogin] = useState({
    email:'',
    password:''
  });

  const [error, setError] = useState('');
  const history =useHistory();

  const handleInputValue = (key) => (e) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const handleLogin = () => {
    
    const { email, password} = login;
    // console.log(email, password);

    if (password !== passwordcheck){
      return setError("비밀번호가 맞지않습니다")
    }
    if (email.length > 0 || password.length >0) {
      axios.post("http://localhost:4000/user/signin" , 
      { email: email, password: password} ,
      { withCredentials: true}
      )
       .then((res) =>{ 
        // const token = res.data.accessToken;
        history.push("/quiz");
      });
    } else {
      setError("이메일과 비밀번호가 틀렸습니다 다시 입력하세요");
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
        className="SigninContainer"
      >
        <div className="SigninContainer_in">
          <Header />
          <p className="Header-name">Draw it</p>
          <form>
            <div className='Signin-form'>
              <div>email</div>
                <input className="Signin-email" type='email' onChange={handleInputValue('email')}  placeholder="email"/>
            </div>
            <div className='Signin-form'>
              <div>password</div>
                <input className="Signin-password" type='password' onChange={handleInputValue('password')} placeholder="password"/>
            </div>
            <div className='Signin-form'>
              <button className="Signin-btn" type='submit' onClick={handleLogin}>
                로그인
              </button>
            </div>
          </form>
          <Footer />
        </div>
       </div>
  )
}
export default Signin;