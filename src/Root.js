import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main, Landing } from './Pages';
import HeaderContainer from "./Containers/Header/HeaderContainer"
import { Provider } from 'react-redux';
import { Login } from './Containers/Landing';

const Root = ({store}) => {
        return (
            <Provider store={store}>
                <HeaderContainer/>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/landing/login" element={<Login />} />
                    </Routes>     
                </BrowserRouter>
            </Provider>
        );
}

export default Root;