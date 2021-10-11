import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Home.css';
const Home = () => {
  const [quizs, setQuizs] = useState();
  useEffect(() => {
    axios.get('http://localhost:4000/post').then((res) => {
      setQuizs(res.data.data);
    });
  }, []);
  // useEffect(() => {
  //   setQuizs([1,2,3,4,5,6,7,8,9,10])
  // }, []);
  return (
    <div className="HomeContainer">
      <header>
        <Header />
      </header>
      <section>
        <section className="Post">
          <div className="Post_Header">
            <p>Draw it Community</p>
            <div className="Post-button">
              <button>내가 낸 문제</button>
              <button>전체 문제</button>
            </div>
          </div>
          <div className="Post_Main">
            {quizs?.map((data) => {
              return (
                <img className="Post-img" key={data.id} src={data.image}></img>
              );
            })}
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
  );
};

export default Home;
