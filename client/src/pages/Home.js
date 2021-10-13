import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Home.css';
import { URL } from '../Url';
import Useredit from './Useredit';
import UserContext from './Context';

const Home = () => {
  const [quizs, setQuizs] = useState();
  const [userinfo, setUserInfo] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const { token, setToken } = useContext(UserContext);
  const [answer, setAnswer] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    allQuizs();
  }, []); //userid

  useEffect(() => {
    axios
      .get(`${URL}/user/mypage`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserInfo(res.data.data);
      });
  }, []); //state.id

  const draw = () => {
    history.push('/quiz');
  };

  const imgDelete = (index) => {
    axios
      .delete(`${URL}/post/${index}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const deleted = quizs.filter((quiz) => quiz.id !== index);
        setQuizs([...deleted]);
      });
  };
  const allQuizs = () => {
    axios
      .get(`${URL}/post`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuizs(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  };
  const myQuizs = () => {
    axios
      .get(`${URL}/post?userid=${userinfo.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuizs(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  };
  const logoutHandler = () => {
    axios
      .post(`${URL}/user/signout`)
      .then((res) => {
        setToken(null);
        localStorage.removeItem('token');
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openHandler = () => {
    setIsOpen(!isOpen);
    scrollStop();
  };

  const scrollStop = () => {
    if (isOpen === false) {
      document.body.style.overflow = 'hidden';
    }
    if (isOpen === true) {
      document.body.style.overflow = 'unset';
    }
  };

  const detailQuizHandler = (index) => {
    axios
      .get(`${URL}/post/${index}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const quizData = res.data.data;
        setAnswer(quizData.post.answer);
        setImageUrl(quizData.post.image);
        history.push({
          pathname: `/postQuiz/${index}`,
        });
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
            <p>Community</p>
            <div className="Post-button">
              <button onClick={myQuizs}>내가 낸 문제</button>
              <button onClick={allQuizs}>전체 문제</button>
            </div>
          </div>
          <div className="Post_Main">
            {quizs?.map((data) => {
              return (
                <div key={data.id} className="QuizContainer">
                  <div className="Post-img">
                    <img
                      src={data.image}
                      onClick={() => detailQuizHandler(data.id)}
                    ></img>
                  </div>
                  <div className="QuizContainer_bottom">
                    <p>{data.User?.nickname}님의 문제</p>
                    {data.userId === userinfo?.id ? (
                      <div onClick={() => imgDelete(data.id)}>X</div>
                    ) : null}
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
              <button onClick={openHandler}>회원 정보 수정</button>
              <button onClick={logoutHandler}>로그아웃</button>
            </div>
          </div>
          <div className="Post_Draw">
            <button onClick={draw}>Draw it</button>
          </div>
        </aside>
      </section>

      {isOpen ? (
        <Useredit
          scrollStop={scrollStop}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      ) : null}
    </div>
  );
};

export default Home;
