// PrivateRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = () => {
    console.log('check start')
    const { isLoggedIn } = useAuth(); // 인증 상태 확인
    console.log('isLoggedIn:', isLoggedIn);
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />; // 인증되어 있으면 하위 라우트들을 렌더링, 그렇지 않으면 로그인 페이지로 이동
};

export default PrivateRoute;