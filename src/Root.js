import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LoginPage from './Pages/Landing/LoginPage';
import MainPage from './Pages/Main/MainPage';
// import CategoryPage from './Pages/Category/HeaderAll';
// import DetailPage from './Pages/Detail/DetailPage';
// import MyInfoPage from './Pages/MyInfo/MyInfoPage';
import SearchPage from './Pages/Search/SerchPage';
// import SurveyPage from './Pages/Survey/SurveyPage';
import Footer from './Components/Footer';
import PrivateRoute from './Components/PrivateRoute';
import Header from './Components/Header';
import TVshow from './Pages/Category/TVshow';
import TVdrama from './Pages/Category/TVdrama';
import Movie from './Pages/Category/Movie';
import Kids from './Pages/Category/Kids';
import Animation from './Pages/Category/Animation';
import './styles/styles.css';
import TopButton from './Components/TopButton';


const MainLayout = () => {
  return (
    <>

      <Header />
    <div className="page-container">
      <Outlet />
    </div>
      <Footer />
      <TopButton />
    
    </>
  );
};
// <Route element={<PrivateRoute />}></Route>
const Root = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/Category/movie" element={<Movie />} />
          <Route path="/Category/tvshow" element={<TVshow />} />
          <Route path="/Category/tvdrama" element={<TVdrama />} />
          <Route path="/Category/kids" element={<Kids />} />
          <Route path="/Category/animation" element={<Animation />} />
        </Route>
        </Route>
      </Routes>
    </Router>
  );
};
export default Root;