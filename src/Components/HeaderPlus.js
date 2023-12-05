import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from 'react-cookie';

const HeaderPlus = () => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const [pinkBoxVisible, setPinkBoxVisible] = useState(false);

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
      <PinkBoxContainer>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </PinkBoxContainer>
      <HeaderRightLayout onMouseEnter={() => setPinkBoxVisible(true)} onMouseLeave={() => setPinkBoxVisible(false)}>
        {/* Your other components */}
      </HeaderRightLayout>
    </HeaderRightList>
  );
};

// 로그아웃 버튼 스타일드 컴포넌트 추가
const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #181818;
  font-size: 20px;
`;

// 핑크색 박스 스타일드 컴포넌트 추가
const PinkBoxContainer = styled.div`
  position: relative;
`;

const PinkBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: pink;
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
`;

const HeaderRightList = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 60px;
  background-color: #181818;
`;

const HeaderRightLayout = styled.div`
  display: flex;
  position: relative;
  margin-right: 20px;
`;

export default HeaderPlus;
