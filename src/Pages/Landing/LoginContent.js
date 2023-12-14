import React from "react";
import styled from "styled-components";
//import oc from "open-color";

const LoginContent = ({title, children}) => (
    <Wrapper>
        <Title>{title}</Title>
        {children}
    </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
`;

const Title = styled.div`
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ed174d;
    margin-bottom: 1rem;
`;

export default LoginContent;
