import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../Utils/styleUtil';

const LoginButton = ({children, onClick}) => (
    <Wrapper onClick={onClick}>
        {children}
    </Wrapper>
);

const Wrapper = styled.div`
    margin-top: -1rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    width: 400px;

    background: #181818;
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: rgba(50, 50, 50, 0.9);
        ${shadow(0)}
    }

    &:active {
        background: ${oc.teal[7]};
    }

`;

export default LoginButton;

