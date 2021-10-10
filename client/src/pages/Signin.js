import React,{useRef} from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Signin.css"

function Signin({ setIsOpen, isOpen, scrollStop }) {
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
                <input className="Signin-email" type='email'  placeholder="email"/>
            </div>
            <div className='Signin-form'>
              <div>password</div>
                <input className="Signin-password" type='password' placeholder="password"/>
            </div>
            <div className='Signin-form'>
              <button className="Signin-btn" type='submit'>
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