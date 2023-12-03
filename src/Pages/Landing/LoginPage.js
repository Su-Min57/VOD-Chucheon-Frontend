import React, { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginBox, LoginButton, LoginContent } from '.'; 
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [subsr, setSubsr] = useState('');
  const [useIp, setUseIp] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // useNavigate를 사용

  const handleLogin = async () => {
    console.log('Login button clicked');
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
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
      <LoginBox>
        <LoginContent title="로그인">
            <Wrapper>
              <input type="text" value={subsr} onChange={(e) => setSubsr(e.target.value)} />
              <input type="password" value={useIp} onChange={(e) => setUseIp(e.target.value)} />
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
  background-color: black;
  `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  width: 300px;
  padding: 70px;
`;

export default LoginPage;


/*
  return (
    <div>
      <h1>로그인</h1>
      <label>Subsr: </label>
      <input type="text" value={subsr} onChange={(e) => setSubsr(e.target.value)} />
      <br />
      <label>Use IP: </label>
      <input type="password" value={useIp} onChange={(e) => setUseIp(e.target.value)} />
      <br />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};
*/
