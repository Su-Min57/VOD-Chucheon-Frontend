//Header 전체 전환 페이지들을 하나로 묶어서 
//Root.js로 가져가는 페이지

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderCategory from "./HeaderCategory";
import HeaderPlus from "./HeaderPlus";

const Header = () => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else if (window.scrollY === 0) {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HeaderNormalLayout isScroll={isScroll}>
        <HeaderLayout>
          <HeaderCategory />
          <HeaderPlus />
        </HeaderLayout>
      </HeaderNormalLayout>
    </>
  );
};

const HeaderNormalLayout = styled.div`
  top: 0;
  position: ${props => (props.isScroll ? "sticky" : "relative")};
  width: 100%;
  background: ${props => (props.isScroll ? "rgb(15, 15, 15)" : "transparent")};
  z-index: 999;
  background-color: #181818;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Header;