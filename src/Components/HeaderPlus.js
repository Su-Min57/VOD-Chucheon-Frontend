import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const HeaderPlus = () => {
  const [searchHiddenBar, setSearchHiddenBar] = useState(true);
  const [bellHiddenBox, setBellHiddenBox] = useState(true);
  const [loginHiddenBox, setLoginHiddenBox] = useState(true);

  const handleSearch = () => {
    setSearchHiddenBar((searchHiddenBar) => !searchHiddenBar);
  };

  const handleBellBox = () => {
    setBellHiddenBox((bellHiddenBox) => !bellHiddenBox);
  };

  const handleLoginBox = () => {
    setLoginHiddenBox((loginHiddenBox) => !loginHiddenBox);
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
            <SearchBarInput />
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
