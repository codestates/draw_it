import React from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Mypage.css"

function Mypage() {
    return (
        
        <div className="MypageContainer">
          <div className="MypageContainer_in">
          <Header />
        <form >
        <div>
            <span>nickname</span>
            <input type='password' />
          </div>
          <div>
            <span>password</span>
            <input type='password' />
          </div>
          <div>
            <span>password 확인</span>
            <input type='password' />
          </div>
          <button className='modify' type='submit' >
             수정
          </button>
        </form>
            <Footer />
          </div>
        </div>
    )
}
export default Mypage;