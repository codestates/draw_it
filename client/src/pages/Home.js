import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Mypage from './Mypage';
import '../styles/Home.css';
import { URL } from '../Url';
const Home = () => {
  const [quizs, setQuizs] = useState();
  const [userinfo, setUserInfo] = useState('');
  const [token, setToken] = useState(useLocation());
  const [isOpenMypage, setIsOpenMypage] = useState(false);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${URL}/post`, {
        headers: {
          authorization: `Bearer ${token.state}`,
        },
      })
      .then((res) => {
        setQuizs(res.data.data);
      });
  }, []); //uerid

  useEffect(() => {
    axios
      .get(`${URL}/user/mypage`, {
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
    history.push({
      pathname: '/quiz',
      state: token,
    });
  };

  const logoutHandler = () => {
    axios
      .post(`${URL}/user/signout`)
      .then((res) => {
        setToken(null);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const MypageHandler = () => {
    setIsOpenMypage(!isOpenMypage);
    scrollStopMypage();
    };

  const scrollStopMypage = () => {
    if (isOpenMypage === false) {
      document.body.style.overflow = "hidden";
      }
    if (isOpenMypage === true) {
      document.body.style.overflow = "unset";
      }
    };

  return (
    <div className="HomeContainer">
      <header>
        <Header />
      </header>
      <section>
        <section className="Post">
          <div className="Post_Header">
            <p>Community</p>
            <div className="Post-button">
              <button>내가 낸 문제</button>
              <button>전체 문제</button>
            </div>
          </div>
          <div className="Post_Main">
            {quizs?.map((data) => {
              return (
                <div key={data.id} className="QuizContainer">
                  <div className="Post-img">
                    <img src={data.image}></img>
                  </div>
                  <div className="QuizContainer_bottom">
                    <p>{data.User?.nickname}님의 문제</p>
                    {data.userId === userinfo?.id ? <div>X</div> : null}
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
              <button onClick={MypageHandler}>회원 정보 수정</button>
              <button onClick={logoutHandler}>로그아웃</button>
            </div>
          </div>
          <div className="Post_Draw">
            <button onClick={draw}>Draw it</button>
          </div>
        </aside>
      </section>
      {isOpenMypage ? (
       <Mypage
          scrollStopMypage={scrollStopMypage}
          setIsOpenMypage={setIsOpenMypage}
          isOpenMypage={isOpenMypage}
        />
        ) : null}
    </div>
  );
};

export default Home;
