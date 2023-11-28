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


  const handleSearch = () => {
    setSearchHiddenBar((searchHiddenBar) => !searchHiddenBar);
    if (!searchHiddenBar && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleBellBox = () => {
    setBellHiddenBox((bellHiddenBox) => !bellHiddenBox);
  };

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
        {searchHiddenBar ? (
          <button onClick={handleSearch}>
            <HeaderRightIcon icon={faSearch} />
          </button>
        ) : (
          <SearchBar>
            <SearchBarInput
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <SearchBarIcon icon={faSearch} onClick={handleSearch} />
          </SearchBar>
        )}
      </HeaderRightLayout>
      <HeaderRightLayout>
        <button onMouseEnter={handleBellBox}>
          <HeaderRightIcon icon={faBell} />
        </button>
        {!bellHiddenBox && (
          <BellHiddenBox onMouseLeave={handleBellBox}>
            최근 알림 메시지가 없습니다.
          </BellHiddenBox>
        )}
      </HeaderRightLayout>
      <HeaderRightLayout>
        {/* 로그아웃 버튼 추가 */}
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </HeaderRightLayout>
      <HeaderLogin>
        <button onMouseEnter={handleLoginBox}>
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
`;


const HeaderRightList = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 60px;
  background-color: black;
`;

const HeaderRightLayout = styled.div`
  display: flex;
  position: relative;
  margin-right: 20px;
`;

const HeaderRightIcon = styled(FontAwesomeIcon)`
  font-size: 1.5em;
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

const SearchBar = styled.div`
  position: relative;
  width: 200px;
  height: 30px;
  border: 2px solid ${({ theme }) => theme.buttonGray};
`;

const SearchBarInput = styled.input`
  height: 24px;
  margin: 2px 0 0 29px;
`;

const SearchBarIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 4px;
  left: 5px;
  font-size: 1.3em;
  color: ${({ theme }) => theme.buttonGray};
`;

const BellHiddenBox = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  width: 408px;
  height: 116px;
  background-color: black;
  opacity: 0.7;
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
