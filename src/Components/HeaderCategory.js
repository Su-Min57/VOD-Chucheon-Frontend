// 상단바 생김새 및 구조 만드는 페이지

import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const HeaderCategory = () => {
  const navigate = useNavigate();

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
      <CategoryList>
        <Listcusor onClick={() => changePage("/main")}>홈</Listcusor>
      </CategoryList>
      <CategoryList>
        <Listcusor onClick={() => changePage("/Category/tvdrama")}>
          TV 드라마
        </Listcusor>
      </CategoryList>
      <CategoryList>
        <Listcusor onClick={() => changePage("/Category/tvshow")}>TV방송</Listcusor>
      </CategoryList>
      <CategoryList>
        <Listcusor onClick={() => changePage("/Category/movie")}>
          영화
        </Listcusor>
      </CategoryList>
    </List>
  );
};

const List = styled.ul`
  display: flex;
  align-items: center;
  background-color: black;
`;

const Logo = styled.li`
  margin: 15px 50 0 60px;
`;

const LogoLink = styled.a`
  height: 68px;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 38px;
`;

const CategoryList = styled.li`
  color: #b3b3b3;
  font-size: 15px;
  margin: 5px 0 0 60px;
`;

const Listcusor = styled.div`
  cursor: pointer;
`;


export default HeaderCategory;
