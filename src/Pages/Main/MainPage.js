import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const MainPage = () => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  const handleLogout = () => {
    // 쿠키 삭제
    removeCookie('accessToken');
    removeCookie('refreshToken');
    console.log("쿠키 삭제")
    // 로그인 페이지로 리디렉션
    navigate('/');
  };

  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome to the main page!</p>
      <p>로그아웃 버튼</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MainPage;