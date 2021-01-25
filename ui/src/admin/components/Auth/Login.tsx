import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Input } from "antd";
import {
    FacebookFilled,
    TwitterCircleFilled,
    GooglePlusCircleFilled,
    EyeInvisibleOutlined,
    EyeTwoTone,
    UserOutlined,
    LockOutlined,
} from "@ant-design/icons";
const Login = (props: any) => {
    const [auth, setAuth] = useState({
        username: "",
        password: "",
    });
    const onDataChange = (e: any, name: string) => {
        let oldData: any = { ...auth };
        oldData[name] = e.target.value;
        setAuth(oldData);
    };
    const onFinish = async (values: any) => {
        let loginData = { ...auth };

        await props.loginAdmin(loginData.username, loginData.password);
    };
    return (
        <>
            <div>
                <title>Prasang Admin Login</title>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <div className="limiter">
                    <div className="container-login100">
                        <div
                            className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-30"
                            style={{ height: "627px !important" }}
                        >
                            <Form className="login100-form validate-form">
                                <span className="login100-form-title p-b-49">
                                    Login
                                </span>
                                <div className="m-b-23">
                                    <span className="label-input100">
                                        Email ID
                                    </span>
                                    {/* <input className="input100" type="text" name="username" placeholder="Type your username" onChange={(e) => onDataChange(e,'username')}/> */}
                                    <Input
                                        prefix={
                                            <UserOutlined className="site-form-item-icon" />
                                        }
                                        size="large"
                                        //  bordered={false}

                                        placeholder=" Enter Email ID"
                                        onChange={(e) =>
                                            onDataChange(e, "username")
                                        }
                                    />
                                    <span
                                        className="focus-input100"
                                        data-symbol=""
                                    />
                                </div>
                                <div className="m-b-23">
                                    <span className="label-input100">
                                        Password
                                    </span>
                                    {/* <input className="input100" type="password" name="password" placeholder="Type your password" onChange={(e) => onDataChange(e,'password')}/> */}
                                    <Input.Password
                                        prefix={
                                            <LockOutlined className="site-form-item-icon" />
                                        }
                                        size="large"
                                        name="password"
                                        // bordered={false}
                                        placeholder=" Enter your password"
                                        iconRender={(visible) =>
                                            visible ? (
                                                <EyeTwoTone />
                                            ) : (
                                                <EyeInvisibleOutlined />
                                            )
                                        }
                                        onChange={(e) =>
                                            onDataChange(e, "password")
                                        }
                                    />
                                    <span
                                        className="focus-input100"
                                        data-symbol=""
                                    />
                                </div>
                                <div>
                                    <span>
                                        {props.errormsg ? (
                                            <h4 style={{ color: "red" }}>
                                                Wrong Username Or Password
                                            </h4>
                                        ) : null}
                                    </span>
                                </div>
                                <div className="text-right p-t-8 p-b-31">
                                    <Link to={"/forgotpassword"}>
                                        Forgot password?
                                    </Link>

                                    {/* <a href="/forgotpassword">
                        Forgot password?
                    </a> */}
                                </div>
                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn" />
                                        {/* <button className="login100-form-btn">
                        Login
                    </button> */}
                                        <Button
                                            style={{
                                                background:
                                                    "-webkit-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff)",
                                            }}
                                            className="login100-form-btn"
                                            onClick={onFinish}
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </div>
                                <div className="txt1 text-center p-t-54 p-b-20">
                                    <span>Or Sign Up Using</span>
                                </div>
                                <div className="flex-c-m">
                                    <span className="login100-social-item bg1">
                                        {/* <i className="fa fa-facebook" /> */}
                                        <FacebookFilled />
                                    </span>
                                    <span className="login100-social-item bg2">
                                        {/* <i className="fa fa-twitter" /> */}
                                        <TwitterCircleFilled />
                                    </span>
                                    <span className="login100-social-item bg3">
                                        {/* <i className="fa fa-google" /> */}
                                        <GooglePlusCircleFilled />
                                    </span>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                {/* <div id="dropDownSelect1" /> */}
            </div>
        </>
    );
};

export default Login;
