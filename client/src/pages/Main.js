import React from "react"
import { Link } from "react-router-dom";
import "../styles/Main.css"

function Main() {
    return (
        <div className="MainContainer">
          <div className="MainContainer_in">
            <div className="ImageContainer">
              <img className="MainContainer-img" alt="MainImage" src="/img/main_image.png" />
            </div>
            <p>게임에 대한 소개 게임에 대한 소개흥미를 일으킬 만한 <br/> 문구게임에 대한 소개 시작하게 만들기</p>
            
            <div className="MainContainer_button" >
              <button className="Main-experience">체험</button><br/>
              <Link to="/Signin">
              <button className="Main-signin">로그인</button>
              </Link>
            </div>
          </div>
        </div>
    )
}
export default Main;