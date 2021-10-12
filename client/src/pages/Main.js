import React, {useState} from "react"
import { Link } from "react-router-dom";
import Signin from './Signin';
import Signup from "./Signup";
import "../styles/Main.css"
import { URL } from '../Url';
function Main() {
  console.log(URL)
  const [isOpen, setIsOpen] = useState(false);
  const [isOpensignup, setIsOpensignup] = useState(false);

  const openHandler = () => {
    setIsOpen(!isOpen);
    scrollStop();
  };
  
  const openHandlersignup = () => {
    setIsOpensignup(!isOpensignup);
    scrollStopsignup();
  };

  //스크롤 안되게 하는 법!
  const scrollStop = () => {
    if (isOpen === false) {
      document.body.style.overflow = "hidden";
    }
    if (isOpen === true) {
      document.body.style.overflow = "unset";
    }
  };
    const scrollStopsignup = () => {
      if (isOpensignup === false) {
        document.body.style.overflow = "hidden";
      }
      if (isOpensignup === true) {
        document.body.style.overflow = "unset";
      }
  };
  return (
      <div className="MainContainer">
        <div className="MainContainer_in">
          <div className="ImageContainer">
            <img className="MainContainer-img" alt="MainImage" src="/img/logo.png" />
          </div>
          
          <div className="MainContainer_comment">
            <p>Draw it</p>
            <p className="Main-comment">당신의 창의력을 보여주세요 !</p>
          </div>
          <div className="MainContainer_button" >
            <Link to="/quiz">
              <button className="Main-experience">게임 시작</button><br/>
            </Link>
            <button className="Main-signin" onClick={openHandler}>로그인</button>
          </div>
          <span className="Main-signup" onClick={openHandlersignup}>회원가입</span>
        </div>
        
        {isOpensignup ? (
        <Signup
          scrollStopsignup={scrollStopsignup}
          setIsOpensignup={setIsOpensignup}
          isOpensignup={isOpensignup}
        />
      ) : null}
        
        {isOpen ? (
        <Signin
          scrollStop={scrollStop}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      ) : null}
      

      
      </div>
  )
}
export default Main;