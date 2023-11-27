import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Landing/LoginPage';
import MainPage from './Pages/Main/MainPage';
// import CategoryPage from './Pages/Category/HeaderAll';
import DetailPage from './Pages/Detail/DetailPage';
import MyInfoPage from './Pages/MyInfo/MyInfoPage';
import SearchPage from './Pages/Search/SerchPage';
import SurveyPage from './Pages/Survey/SurveyPage';
import Footer from './Components/Footer';
import PrivateRoute from './Components/PrivateRoute';
import Header from './Components/Header';
import TVshow from './Pages/Category/TVshow';
import TVdrama from './Pages/Category/TVdrama';
import Movie from './Pages/Category/Movie';



const Root = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

        </Routes>
      <Header />
        <Routes>
          <Route element={<PrivateRoute />}></Route>
          <Route path="/main" element={<MainPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/myinfo" element={<MyInfoPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/Category/movie" element={<Movie />} />
          <Route path="/Category/tvshow" element={<TVshow />} />
          <Route path="/Category/tvdrama" element={<TVdrama />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default Root;