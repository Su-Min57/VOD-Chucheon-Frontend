//리덕스 상태에 연결 된 컨테이너 컴포넌트
//비로그인 상태에서는 로그인버튼을 보여주고,
//로그인 상태에서는 유저썸네일을 보여준다
import React, { Component } from 'react';
import { Header } from '../../Components/Header';

class HeaderContainer extends Component {
    render() {
        return (
            <Header>
                Hi
            </Header>
        );
    }
}

export default HeaderContainer;
