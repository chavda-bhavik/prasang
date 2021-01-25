import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

import * as types from "../store/actionTypes";
import Login from "../components/Auth/Login";
import { Login_Admin } from "../store/actions/actionMethod";
import "./css/main.css";
import "./css/util.css";

const Auth = (props: any) => {
    const [login] = useMutation(Login_Admin);
    const [err, setErr] = useState(false);
    const dispatch = useDispatch();
    const loginAdmin = async (email: string, password: string) => {
        dispatch({
            type: types.INIT_ADMIN_LOGIN,
        });
        try {
            const response = await login({
                variables: { email: email, password: password },
            });
            dispatch({
                type: types.ADMIN_LOGIN_SUCCESS,
                user: response.data.login.user,
                token: response.data.login.token,
            });
            localStorage.setItem("Prasangtoken", response.data.login.token);
            props.history.push("/dashboard");
        } catch (error) {
            dispatch({
                type: types.ADMIN_LOGIN_FAILED,
                error: error.message,
            });
            setErr(true);
        }
    };
    return (
        <>
            <Login loginAdmin={loginAdmin} errormsg={err} />
        </>
    );
};

export default Auth;
