import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginBox, LoginButton, LoginContent, Now } from '.';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [subsr, setSubsr] = useState(localStorage.getItem('subsr') || ''); // 로컬 스토리지에서 불러오기
  const [useIp, setUseIp] = useState('');
  const [rememberSetTopBox, setRememberSetTopBox] = useState(
    localStorage.getItem('rememberSetTopBox') === 'true' || false
  ); // 로컬 스토리지에서 불러오기
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('Login button clicked');
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        subsr: subsr,
        use_ip: useIp,
      });

      if (response && response.data) {
        const { access, refresh } = response.data;
        localStorage.setItem('subsr', subsr);

        if (rememberSetTopBox) {
          localStorage.setItem('subsr', subsr);
          localStorage.setItem('rememberSetTopBox', 'true');
        } else {
          localStorage.removeItem('rememberSetTopBox');
        }

        Cookies.set('access_token', access);
        Cookies.set('refresh_token', refresh);
        console.log('Access Token:', access);
        console.log('Refresh Token:', refresh);

        login();
        navigate('/main');
        console.log('go main!');
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

  useEffect(() => {
    // 새로고침할 때 로컬 스토리지에서 값 불러오기
    setSubsr(localStorage.getItem('subsr') || '');
    setRememberSetTopBox(localStorage.getItem('rememberSetTopBox') === 'true' || false);
  }, []);

  return (
    <StyledLoginPage>
      <Now />
      <LoginBox>
        <LoginContent title="Login">
          <CenteredText>로그인 후 이용 부탁드립니다.</CenteredText>
          <Wrapper>
            <input type="text" placeholder="셋톱번호" value={subsr} onChange={(e) => setSubsr(e.target.value)} />
            <input type="password" placeholder="비밀번호" value={useIp} onChange={(e) => setUseIp(e.target.value)} />
            <RememberCheckbox>
              <input type="checkbox" checked={rememberSetTopBox} onChange={() => setRememberSetTopBox(!rememberSetTopBox)} />
              <span>아이디 저장</span>
            </RememberCheckbox>
          </Wrapper>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
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
  width: 400px;
  padding-top: 5rem;
  padding-bottom: 2rem;

  & input {
    margin-bottom: 15px;
    padding: 15px;
    font-size: 15px;
    background-color: white;
    border: 2px solid rgba(200, 200, 200, 0.5);
    outline: none;
    transition: border 0.3s;
  }

  & input:focus {
    background-color: white;
    color: black;
    border: 2px solid #181818;
  }
`;

const CenteredText = styled.div`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: -4rem;
  color: rgba(50, 50, 50, 0.7);
  font-size: 15px;
`;

const RememberCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-top: -5px;
  margin-bottom: 10px;
  font-size: 14px;
  color: black;

  input {
    margin-right: 5px;
    margin-bottom: 0px;
  }
`;

export default LoginPage;
