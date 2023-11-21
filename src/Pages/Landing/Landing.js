import React, { Component } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as baseActions from '../../redux/modules/base';
import { LoginBox } from "../../Components/Landing";
import { Login } from "../../Containers/Landing";

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
    background-image: url("https://images.unsplash.com/photo-1545630478-cf62cdd247d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG1vdmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60");
`;

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Landing);






//export default Landing;