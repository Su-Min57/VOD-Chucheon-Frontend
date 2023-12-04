// //상단바의 기타 검색창, 로그인 박스, 로그아웃 버튼(예정)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from 'react-cookie';



const HeaderPlus = () => {
  const navigate = useNavigate();
  const [searchHiddenBar, setSearchHiddenBar] = useState(true);
  const [bellHiddenBox, setBellHiddenBox] = useState(true);
  const [loginHiddenBox, setLoginHiddenBox] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [, removeCookie] = useCookies(['accessToken', 'refreshToken']);


  const handleLoginBox = () => {
    setLoginHiddenBox((loginHiddenBox) => !loginHiddenBox);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
        {/* 로그아웃 버튼 추가 */}
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </HeaderRightLayout>
      <HeaderLogin>
        <button>   {/* onMouseEnter={handleLoginBox}  이거 추가하면 아이콘에 마우스 올리면 하단바 생성 */}
          <HeaderLoginImg src="/images/my_logo.png" />
        </button>
        {!loginHiddenBox && <LoginHiddenBox onMouseLeave={handleLoginBox} />}
        <HeaderRightIcon icon={faCaretDown} />
      </HeaderLogin>
    </HeaderRightList>
  );
};

// 로그아웃 버튼 스타일드 컴포넌트 추가
const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 20px;
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

const HeaderRightIcon = styled(FontAwesomeIcon)`
  font-size: 1.5pm;
  color: ${({ theme }) => theme.buttonGray};
`;

const HeaderLogin = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const HeaderLoginImg = styled.img`
  width: 32px;
  height: 32px;
`;

const LoginHiddenBox = styled.div`
  position: absolute;
  top: 60px;
  right: 65px;
  width: 179px;
  height: 288px;
  background-color: black;
`;

export default HeaderPlus;
