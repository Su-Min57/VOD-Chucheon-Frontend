import React from "react";
import styled from "styled-components";
//import oc from "open-color";

const LoginContent = ({title, children}) => (
    <Wrapper>
        <Title>{title}</Title>
        <Underline />
        {children}
    </Wrapper>
);

// 헬로비전 로고와 subsr과 password
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
`;

// "LG헬로비전에 오신 것을 환영합니다." Title
const Title = styled.div`
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
    color: #181818;
    margin-top: -0.5rem;
    margin-bottom: -2rem;
    margin-left: 1px; 
`;

const Underline = styled.div`
  width: 10%;
  height: 5px;
  background-color: #ed174d;
  margin-top: 50px;
  margin-bottom: -30px;
`;

export default LoginContent;
