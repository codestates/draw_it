import React from "react"
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Mypage.css"

axios.defaults.withCredentials = true;

function Mypage(props) {

  const { } = props;
    return (
        
        <div className="MypageContainer">
          <div className="MypageContainer_in">
          <Header />
        <form >
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