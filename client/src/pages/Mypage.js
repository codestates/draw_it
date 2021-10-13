import React, { useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Mypage.css';

axios.defaults.withCredentials = true;

function Mypage(props, { setIsOpenMypage, isOpenMypage, scrollStopMypage }) {
  const { email, nickname } = props;

  const backgroundEl = useRef(null);

  const backgroundClick = (e) => {
    if (e.target === backgroundEl.current) {
      setIsOpenMypage(!isOpenMypage);
      scrollStopMypage();
    }
  };
  return (
    <div
      onClick={(e) => backgroundClick(e)}
      ref={backgroundEl}
      className='MypageContainer'
    >
      <div className='MypageContainer_in'>
        <Header />
        <p className='Mypage-Header-name'>Draw it</p>
        <form>
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
          <button className='modify' type='submit'>
            수정
          </button>
        </form>
      </div>
    </div>
  );
}
export default Mypage;
