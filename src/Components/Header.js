import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
      <GenreList>
        <Listcusor onClick={() => changePage("/main")}>홈</Listcusor>
      </GenreList>
      <GenreList>
        <Listcusor onClick={() => changePage("/genre/drama")}>
          TV 드라마
        </Listcusor>
      </GenreList>
      <GenreList>
        <Listcusor onClick={() => changePage("/genre/movie")}>TV방송</Listcusor>
      </GenreList>
      <GenreList>
        <Listcusor onClick={() => changePage("/wishlists")}>
          영화
        </Listcusor>
      </GenreList>
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

const GenreList = styled.li`
  color: #b3b3b3;
  font-size: 15px;
  margin: 5px 0 0 60px;
`;

const Listcusor = styled.div`
  cursor: pointer;
`;


export default Header;
