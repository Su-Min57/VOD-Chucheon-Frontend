import React, { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginBox, LoginButton, LoginContent, Now } from '.'; 
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [subsr, setSubsr] = useState('');
  const [useIp, setUseIp] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // useNavigate를 사용

  const handleLogin = async () => {
    console.log('Login button clicked');
    try {
      const response = await axios.post('http://main.jinttoteam.com/api/login/', {
        subsr: subsr,
        use_ip: useIp,
      });
      
      if (response && response.data) {
        const { access, refresh } = response.data;

        // 쿠키에 토큰 저장
        Cookies.set('access_token', access);
        Cookies.set('refresh_token', refresh);
        console.log('Access Token:', access);
        console.log('Refresh Token:', refresh);
        localStorage.setItem('subsr', subsr)
  
        login();
        navigate('/main'); // 로그인 성공 후 메인페이지로 이동
        console.log('go main!')
      } else {
        console.error('Login failed: Invalid response format');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data.detail);
      } else {
        console.error('Login failed:', error.message);
      }
    }
  };

  return (
    <StyledLoginPage>
      <Now/>
      <LoginBox>
        <LoginContent title="LG헬로비전에 오신 것을 환영합니다.">
            <Wrapper>
              <input type="text" placeholder="셋톱번호" value={subsr} onChange={(e) => setSubsr(e.target.value)} />
              <input type="password" placeholder="비밀번호" value={useIp} onChange={(e) => setUseIp(e.target.value)} />
            </Wrapper>
            <LoginButton onClick={handleLogin}>
              로그인
            </LoginButton>
        </LoginContent>
      </LoginBox>   
    </StyledLoginPage>
  );
};

const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  width: 300px;
  padding: 70px;

  /* 스타일 추가 */
  & input {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 20px;
    background-color: pink;
  }
`;

export default LoginPage;

