import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from 'react-cookie';

const HeaderPlus = () => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  const handleLogout = () => {
    // 로그아웃 관련 작업을 여기에 수행: 쿠키 삭제, 로그인 페이지로 리디렉션
    removeCookie('accessToken');
    removeCookie('refreshToken');
    console.log("로그아웃 클릭");
    // 로그인 페이지로 리디렉션하는 navigate 사용
    navigate('/');
  };

  return (
    <HeaderRightList>
      <HeaderRightLayout>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </HeaderRightLayout>
    </HeaderRightList>
  );
};

// 로그아웃 버튼 스타일드 컴포넌트 추가
const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0px 30px;
  color: white;
  background-color: #181818;
  font-size: 20px;
`;

const HeaderRightList = styled.div`
  display: flex;
  align-items: center;
  background-color: #181818;
  color: white;

  &:hover {
    background-color: #ED174D;

    ${LogoutButton} {
      background-color: #ED174D; /* Change LogoutButton background color on hover */
    }
  }
`;

const HeaderRightLayout = styled.div`
  display: flex;
  position: relative;
  margin-left: -0px; /* Adjust the margin-left to move the button to the left */
`;

export default HeaderPlus;