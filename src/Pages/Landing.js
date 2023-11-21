import React, { Component } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as baseActions from '../redux/modules/base';
import { LoginBox } from '../Components/Landing';
import { Login } from "../Containers/Landing";

class Landing extends Component {
    //페이지에 진입 할 때 헤더를 비활성화
    componentWillMount() {
        this.props.BaseActions.setHeaderVisibility(false);
    }

    //페이지에서 벗어 날 때 다시 활성화
    componentWillUnmount() {
        this.props.BaseActions.setHeaderVisibility(true);
    }

    render() {
        return (
            <Whole>
                <LoginBox>
                    <Login>

                    </Login>
                </LoginBox>
            </Whole>
        );
    }
}

const Whole = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA4MTlfMjkw%2FMDAxNTk3ODQzNjk1MTQw.pxImDlVRJZXDqI_XQOoW2WMmj6nVaolmOrvWudEldakg.XiT3x-x6WwwTz-YWuWjKJ1fzQuSLDjJx9BRCEYsjLiEg.PNG.your_gene%2F%25BD%25BA%25C5%25A9%25B8%25B0%25BC%25A6_2020-08-19_%25BF%25C0%25C8%25C4_8.06.25.png&type=sc960_832");
`;

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Landing);






//export default Landing;