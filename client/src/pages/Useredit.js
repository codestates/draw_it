import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import '../styles/Useredit.css';

function Useredit({ setIsOpen, isOpen, scrollStop }) {
  const [message, setMessage] = useState('');
  const [edit, setEdit] = useState({
    nickname: '',
    password: '',
    passwordcheck: '',
  });

  const handleInputValue = (key) => (e) => {
    setEdit({ ...edit, [key]: e.target.value });
  };

  const backgroundEl = useRef(null);

  const backgroundClick = (e) => {
    if (e.target === backgroundEl.current) {
      setIsOpen(!isOpen);
      scrollStop();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nickname, password } = edit;

    if (nickname && password) {
      console.log('API');
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
            <div>닉네임</div>
            <input
              className='Useredit-email'
              type='email'
              onChange={handleInputValue('nickname')}
              placeholder='nickname'
            />
          </div>
          <div className='Useredit-form'>
            <div>password</div>
            <input
              className='Useredit-password'
              type='password'
              onChange={handleInputValue('password')}
              placeholder='password'
            />
          </div>
          <div className='Useredit-form'>
            <div>password check</div>
            <input
              className='Useredit-password'
              type='password'
              onChange={handleInputValue('password check')}
              placeholder='password check'
            />
          </div>
          <div className='Useredit-form'>
            <button className='Useredit-btn' type='submit'>
              수정 완료
            </button>
          </div>
          {message === '닉네임이 수정되었습니다.' ? (
            <div className='Useredit-alert-box-blue'>{message}</div>
          ) : (
            <div className='Useredit-alert-box-red'>{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Useredit;
