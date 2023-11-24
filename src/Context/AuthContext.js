import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    console.log('isLoggedIn 값:', isLoggedIn);
    console.log()
  }, [isLoggedIn]);

  const login = () => {
    const token = Cookies.get('access_token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};