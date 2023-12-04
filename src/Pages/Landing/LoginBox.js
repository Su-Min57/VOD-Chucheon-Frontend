import React from "react";
import styled from  'styled-components';
import oc from "open-color";
import { Link } from "react-router-dom";

const LoginBox = ({children}) => (
    <Positioner>
        <ShadowedBox>
            <LogoWrapper>
                <Logo to="/">LG HelloVision</Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

//화면 중앙에 위치시키기
const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

//너비, 그림자 설정
const ShadowedBox = styled.div`
    width: 500px;
    border: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

//로고
const LogoWrapper = styled.div`
    background: ${oc.white[0]};
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
`;

const Logo = styled(Link)`
    color: ${oc.pink[8]};
    font-family: 'Roboto';
    font-size: 2.4rem;
    font-weight: bold;
    letter-spacing: 2px;
    text-decoration: none;
`;

//children 이 들어가는 곳
const Contents = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    background: white;
    padding: 2rem;
    height: auto;
`;

export default LoginBox;












