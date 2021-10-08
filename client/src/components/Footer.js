import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
  <footer>
      <div style={{ textAlign:"center"}}>경고문구</div>
      <div style={{ textAlign:"center"}}><Link to='/Signin'>로그인 링크</Link></div>
  </footer>
  );
};
  
export default Footer;