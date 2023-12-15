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
  const [rememberSetTopBox, setRememberSetTopBox] = useState(false); 
  const { login } = useAuth();
  const navigate = useNavigate(); // useNavigate를 사용

  const handleLogin = async () => {
    console.log('Login button clicked');
    try {
      const response = await axios.post('https://main.jinttoteam.com/api/login/', {
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
        <LoginContent title="Login">
        <CenteredText>로그인 후 이용 부탁드립니다.</CenteredText>
            <Wrapper>
              <input type="text" placeholder="셋톱번호" value={subsr} onChange={(e) => setSubsr(e.target.value)} />
              <input type="password" placeholder="비밀번호" value={useIp} onChange={(e) => setUseIp(e.target.value)} />
              <RememberCheckbox>
              <input
                type="checkbox"
                checked={rememberSetTopBox}
                onChange={() => setRememberSetTopBox(!rememberSetTopBox)}
              />
              <span>아이디 저장</span>
              </RememberCheckbox>
            </Wrapper>
            <LoginButton onClick={handleLogin}>
              로그인
            </LoginButton>
        </LoginContent>
      </LoginBox>   
    </StyledLoginPage>
  );
};

// 배경색과 전체 컴포넌트
const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  `;

// subsr과 password 
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  width: 400px;
  padding-top: 5rem;
  padding-bottom: 2rem;

  /* 스타일 추가 */
  & input {
    margin-bottom: 15px;
    padding: 15px;
    font-size: 15px;
    background-color: white;
    border: 2px solid rgba(200, 200, 200, 0.5); /* 초기에는 투명한 선 */
    outline: none; /* 마우스 클릭 시 파란 테두리 제거 */
    transition: border 0.3s; /* 부드러운 전환을 위한 트랜지션 */
  }

  /* input에 focus가 되었을 때 */
  & input:focus {
    background-color: white;
    color: black;
    border: 2px solid #181818; /* 클릭 시 검정 선 추가 */
  }
`;

const CenteredText = styled.div`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: -4rem;
  color:  rgba(50, 50, 50, 0.7);
  font-size: 15px;
`;

const RememberCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-top: -5px;
  margin-bottom: 10px;
  font-size: 14px;

  input {
    margin-right: 5px;
    margin-bottom: 0px;
  }
`;

export default LoginPage;

