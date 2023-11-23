import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [subsr, setSubsr] = useState('');
  const [useIp, setUseIp] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // useHistory 대신 useNavigate를 사용

  const handleLogin = async () => {
    console.log('Login button clicked');
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        subsr: subsr,
        use_ip: useIp,
      });
  
      if (response && response.data) {
        const { access, refresh } = response.data;
        console.log('Access Token:', access);
        console.log('Refresh Token:', refresh);
  
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
  
        login();
        navigate('/main'); // 로그인 성공 후 메인페이지로 이동
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
    <div>
      <h1>Login</h1>
      <label>Subsr: </label>
      <input type="text" value={subsr} onChange={(e) => setSubsr(e.target.value)} />
      <br />
      <label>Use IP: </label>
      <input type="password" value={useIp} onChange={(e) => setUseIp(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
