import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const changePage = path => {
    navigate(path);
  };

  return (
    <List>
      <Logo>
        <LogoLink>
          <LogoImg src="/images/LG_logo.png" />
        </LogoLink>
      </Logo>
      <CategoryList active={pathname === '/main'} onClick={() => changePage("/main")}>
        홈
      </CategoryList>
      <CategoryList active={pathname === '/Category/tvdrama'} onClick={() => changePage("/Category/tvdrama")}>
        TV 드라마
      </CategoryList>
      <CategoryList active={pathname === '/Category/tvshow'} onClick={() => changePage("/Category/tvshow")}>
        TV방송
      </CategoryList>
      <CategoryList active={pathname === '/Category/movie'} onClick={() => changePage("/Category/movie")}>
        영화
      </CategoryList>
      <CategoryList active={pathname === '/search'} onClick={() => changePage("/search")}>
        검색
      </CategoryList>
    </List>
  );
};

const List = styled.ul`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #181818;
  list-style-type: none;
`;

const Logo = styled.li`
  margin: 15px 50px 0 60px;
`;

const LogoLink = styled.a`
  height: 68px;
`;

const LogoImg = styled.img`
  margin: 0;
  width: 200px;
  height: 60px;
  align-items: center;
`;

const CategoryList = styled.li`
  color: ${props => (props.active ? '#ED174D' : 'white')};
  font-size: 20px;
  margin: 5px 10px 10px 60px;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${props => (props.active ? '#ED174D' : 'transparent')};
    bottom: 0;
    left: 0;
    transition: background-color 0.3s ease;
  }

  &:hover {
    color: #ED174D;
  }
`;

export default HeaderCategory;
