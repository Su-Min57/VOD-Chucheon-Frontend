import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main, Landing } from './Pages';
import HeaderContainer from "./Containers/Base/HeaderContainer"
import { Provider } from 'react-redux';
import { Login } from './Containers/Landing';

const Root = ({store}) => {
        return (
            <Provider store={store}>
                <HeaderContainer/>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Main />} />
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/landing/login" element={<Login />} />
                    </Routes>     
                </BrowserRouter>
            </Provider>
        );
}

export default Root;