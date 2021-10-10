import React,{useRef} from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Signup.css"

function Signup({ setIsOpensignup, isOpensignup, scrollStopsignup }) {
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
          <form>
            <div className='Signup-form'>
              <div>email</div>
                <input className="Signup-email" type='email'  placeholder="email"/>
            </div>
            <div className='Signup-form'>
              <div>nickname</div>
                <input className="Signup-nickname" type='text'  placeholder="nickname"/>
            </div>
            <div className='Signup-form'>
              <div>password</div>
                <input className="Signup-password" type='password' placeholder="password"/>
            </div>
            <div className='Signup-form'>
              <div>password 확인</div>
                <input className="Signup-password-check" type='password' placeholder="password 확인"/>
            </div>
            <div className='Signup-form'>
              <button className="Signup-btn" type='submit'>
                회원가입
              </button>
            </div>
          </form>
          <Footer />
        </div>
      </div>
  )
}
export default Signup;