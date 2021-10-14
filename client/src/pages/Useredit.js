import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Useredit.css';
import axios from 'axios';
import { URL } from '../Url';

function Useredit({
  userInfo,
  setUserInfo,
  setIsOpen,
  isOpen,
  scrollStop,
  token,
}) {
  const history = useHistory();
  const [editMessage, setEditMessage] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');

  const handleInputValue = (key) => (e) => {
    setNicknameValue(e.target.value);
  };

  const backgroundEl = useRef(null);

  const backgroundClick = (e) => {
    if (e.target === backgroundEl.current) {
      setIsOpen(!isOpen);
      scrollStop();
    }
  };

  const handleSubmit = (e) => {
    if (!nicknameValue) {
      e.preventDefault();
      return setEditMessage('변경할 닉네임을 입력하세요.');
    } else {
      axios
        .patch(
          `${URL}/user/mypage`,
          {
            nickname: nicknameValue,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
              withCredentials: true,
            },
          }
        )
        .then((res) => {
          setUserInfo({ ...userInfo, nickname: res.data.data.nickname });
          // setIsOpen(!isOpen);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      onClick={(e) => backgroundClick(e)}
      ref={backgroundEl}
      className='UsereditContainer'
    >
      <div className='UsereditContainer_in'>
        <Header />
        <p className='Header-name'>Draw it</p>
        <form>
          <div className='Useredit-form'>
            <div>nickname</div>
            <input
              className={'Useredit-nickname'}
              type='nickname'
              onChange={handleInputValue('nickname')}
              placeholder='nickname'
              value={nicknameValue}
            />
          </div>
          <div className='Useredit-form'>
            <button
              className='Useredit-btn'
              // type='submit'
              onClick={handleSubmit}
            >
              변경 완료
            </button>
          </div>
          <div className='Useredit-alert-box-red'>{editMessage}</div>
        </form>
      </div>
    </div>
  );
}

export default Useredit;
