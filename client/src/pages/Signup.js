import React from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Signup.css"

function Signup() {
    return (
        
        <div className="SignupContainer">
          <div className="SignupContainer_in">
          <Header />
        <form >
          <div>
            <span>email</span>
            <input type='email' />
          </div>
          <div>
            <span>nickname</span>
            <input type='text' />
          </div>
          <div>
            <span>password</span>
            <input type='password' />
          </div>
          <div>
            <span>password 확인</span>
            <input type='password' />
          </div>
          <button className='Signup' type='submit' >
            회원가입
          </button>
        </form>
            <Footer />
          </div>
        </div>
    )
}
export default Signup;