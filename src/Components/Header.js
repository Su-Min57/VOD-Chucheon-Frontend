import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderCategory from "./HeaderCategory";
import HeaderRight from "./HeaderRight";


const Header = () => {
  const [isscroll, setIsScroll] = useState(false);

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
      <HeaderNormalLayout isscroll={isscroll ? "true" : "false"}>
        <HeaderLayout>
          <HeaderCategory />
          <HeaderRight />
        </HeaderLayout>
      </HeaderNormalLayout>
    </>
  );
};

const HeaderNormalLayout = styled.div`
  top: 0;
  position: ${props => (props.isscroll === "true" ? "sticky" : "relative")};
  width: 100%;
  background: ${props => (props.isscroll === "true" ? "rgb(15, 15, 15)" : "transparent")};
  z-index: 999;
  background-color: #181818;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Header;