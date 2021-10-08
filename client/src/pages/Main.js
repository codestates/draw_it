import React from "react"
import { Link } from "react-router-dom";
import "../styles/Main.css"

function Main() {
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
              <Link to="/home">
                <button className="Main-experience">게임 시작</button><br/>
              </Link>
              <Link to="/Signin">
                <button className="Main-signin">로그인</button>
              </Link>
            </div>
          </div>
        </div>
    )
}
export default Main;