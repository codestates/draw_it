import React from 'react'
import Header_logo from '../components/Header_logo'
const Home = () => {
    return (
      <div className="HomeContainer">
        <header>
          <Header_logo />
        </header>
        <section>
          <section className="Post">
            <div className = "Post_Header">
              <p>Draw it Community</p>
              <div className = "Post-button">
                <button>내가 낸 문제</button>
                <button>전체 문제</button>
              </div>
            </div>
            <div className="Post_Main">
              <ul>
                <ui>
                  
                </ui>
              </ul>
            </div>
          </section>
          <aside>
            <div className="Mypage">
              <h2>My Page</h2>
              <div>나의 정답 개수</div>
              <div className="Mypage_button">
                <button>회원 정보 수정</button>
                <button>로그아웃</button>
              </div>
            </div>
            <div className="Post_Draw">
              <button>Draw it</button>
            </div>
          </aside>
        </section>
      </div>
    )
}

export default Home
