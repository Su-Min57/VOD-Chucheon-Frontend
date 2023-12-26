import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { useCookies } from 'react-cookie';
import SearchModal from "./Modal/SearchModal";

const HeaderRight = () => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  //const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    setIsSearchModalOpen(true);
  };

  const handleSearchSubmit = (query) => {
    console.log(`검색어: ${query}`);
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleLogout = (event) => {
    event.preventDefault()
    removeCookie('accessToken');
    removeCookie('refreshToken');
    navigate('/');
  };

  return (
    <>
      <HeaderRightList>
        <NavRightLayout>
          <NavSearchIcon
              src={isSearchModalOpen ? '/images/closed_btn_search.png' : '/images/open_btn_search.png'}
              alt="Search"
              onClick={handleSearch}
              isSearchModalOpen={isSearchModalOpen}
            />
          {/* 새로운 SearchModalSlide 컴포넌트 추가 */}
          <SearchModalSlide isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}>
            <SearchModal
              isOpen={isSearchModalOpen}
              onClose={() => setIsSearchModalOpen(false)}
              onSubmit={handleSearchSubmit}
            />
            </SearchModalSlide>
        </NavRightLayout>
        <HeaderRightLayout>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </HeaderRightLayout>
      </HeaderRightList>
    </>
  );
};

// SlideDown 애니메이션 추가
const slideDown = keyframes`
  from {
    transform: translateY(-2%);
  }
  to {
    transform: translateY(0);
  }
`;

const SearchModalSlide = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  animation: ${slideDown} 0.3s ease; /* SlideDown 애니메이션 적용 */
  display: ${(props) => (props.isOpen ? "flex" : "none")};
`;

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
`;

const HeaderRightLayout = styled.div`
  display: flex;
  position: relative;
  margin-left: -0px; /* Adjust the margin-left to move the button to the left */
  height: 100%;

  &:hover {
    background-color: #ED174D;

    ${LogoutButton} {
      background-color: #ED174D; /* Change LogoutButton background color on hover */
    }
  }
  `;

const NavRightLayout = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 240px;
`;

const NavSearchIcon = styled.img`
  /* 이미지 스타일을 추가하세요 */
  width: 24px;
  height: 24px;
  cursor: pointer;

  ${(props) =>
    props.isSearchModalOpen &&
    css`
      content: url('/images/closed_btn_search.png');
    `}

  ${(props) =>
    !props.isSearchModalOpen &&
    css`
      content: url('/images/open_btn_search.png');
    `}
`;

export default HeaderRight;