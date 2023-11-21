import React, { Component } from "react";
import { LoginContent, InputWithLabel, LoginButton  } from "../../Components/Landing";
import { Link } from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <LoginContent title="로그인">
                <InputWithLabel label="셋톱번호" name="number" placeholder="셋톱번호"/>
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
                <LoginButton>
                    <Link to="/">
                        로그인
                    </Link>
                </LoginButton>
            </LoginContent>
        );
    }
}

export default Login;
