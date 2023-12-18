import React from "react";
import styled from "styled-components";
import { MoonLoader } from "react-spinners";

const Loading = () => {
    return (
        <LoadingContainer>
            <LoadingText>잠시만 기다려주세요</LoadingText>
            <MoonLoader color="#ed174d" size={50} />
        </LoadingContainer>
    );
};

const LoadingContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: black;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;

const LoadingText = styled.div`
    font: 1rem 'Noto Sans KR';
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: white;
    margin-bottom: 35px;
`;


export default Loading;