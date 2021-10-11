import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Home.css';
const Home = () => {
  const [quizs, setQuizs] = useState();
  const [userinfo, setUserInfo] = useState('');
  const [token, setToken] = useState(useLocation());
  const history = useHistory();
  useEffect(() => {
    axios.get('http://localhost:4000/post').then((res) => {
      setQuizs(res.data.data);
    });
  }, []); //uerid

  useEffect(() => {
    axios
      .get('http://localhost:4000/user/mypage', {
        headers: {
          authorization: `Bearer ${token.state}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data.data);
      });
  }, []); //state=id
  console.log('userinfo', userinfo);

  const draw = () => {
    history.push('/quiz');
  };

  const logoutHandler = () => {
    axios
      .post('http://localhost:4000/user/signout')
      .then((res) => {
        setToken(null);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
              // console.log(data)
              return (
                <div className="QuizContainer">
                  <div className="Post-img">
                    <img key={data.id} src={data.image}></img>
                  </div>
                  <div className="QuizContainer_bottom">
                    <p>{data.User?.nickname}</p>
                    {data.userId === userinfo?.id ? <div>삭제</div> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <aside>
          <div className="Mypage">
            <h2>My Page</h2>
            <div>
              {userinfo?.nickname}의 정답 개수 : {userinfo?.passedPosts}
            </div>
            <div className="Mypage_button">
              <button>회원 정보 수정</button>
              <button onClick={logoutHandler}>로그아웃</button>
            </div>
          </div>
          <div className="Post_Draw">
            <button onClick={draw}>Draw it</button>
          </div>
        </aside>
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
    </div>
  );
};

export default Home;
