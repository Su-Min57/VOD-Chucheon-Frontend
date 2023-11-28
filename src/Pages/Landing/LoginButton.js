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
    margin-top: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    background: ${oc.pink[6]};;
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: pink;
        ${shadow(0)}
    }

    &:active {
        background: ${oc.teal[7]};
    }

`;

export default LoginButton;

