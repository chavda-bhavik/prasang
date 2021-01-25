import React, { useEffect } from "react";
// import AdminMainLayout from './components/common/AdminMainLayout'
import { Link } from "react-router-dom";
import AdminHeader from "./components/common/AdminHeader";
import Category from "./containers/Category";
import CategoryAddForm from "./containers/CategoryAddForm";
import CategoryEditForm from "./containers/CategoryEditForm";
import Event from "./containers/Events/Event";
import EventAddForm from "./containers/Events/EventAddForm";
import EventEditForm from "./containers/Events/EventEditForm";
import Dashboard from "./containers/Dashboard";
import ChangePassword from "./containers/ChangePassword";
import ForgotPassword from "./containers/ForgotPassword";
import PrasangAdminLogin from "./containers/Auth";
import ResetPassword from "./containers/ResetPassword";
import UserList from "./containers/UserList";
import { IRootState } from "./store/store";
import { Switch, Route, Redirect } from "react-router";
import * as types from "./store/actionTypes";
import { Menu, Dropdown, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, LogoutOutlined, LockOutlined } from "@ant-design/icons";
import { userProfile } from "./store/actions/actionMethod";
import { useQuery } from "@apollo/client";
import Participantes from "./containers/Participants";
import Winners from "./containers/Winners";

const { Content } = Layout;

const PrasangAdmin = (props: any) => {
    const dispatch = useDispatch();
    const { data, refetch, loading } = useQuery(userProfile);
    const { location } = props;
    const token = useSelector((state: IRootState) =>
        state.auth.token ? true : false
    );

    const logout = () => {
        dispatch({
            type: types.INIT_ADMIN_LOGOUT,
        });
        try {
            dispatch({
                type: types.ADMIN_LOGOUT_SUCCESS,
            });
            localStorage.removeItem("Prasangtoken");
            props.history.push("/login");
        } catch (error) {
            dispatch({
                type: types.ADMIN_LOGOUT_FAILED,
                error: error.message,
            });
        }
    };
    useEffect(() => {
        let tokens = localStorage.getItem("Prasangtoken");
        if (props.location.pathname.startsWith("/") && !token) {
            refetch();
            if (!loading && data) {
                dispatch({
                    type: "PRASANG_ADMIN_LOGIN_SUCCESS",
                    user: data.usersProfile,
                    token: tokens,
                });
            }
        }
    }, [location.pathname, token, data]);

    let renders: any = <Redirect to="/" />;

    if (props.location.pathname.startsWith("/") && !token) {
        renders = (
            <Switch>
                <Route path="/login" exact component={PrasangAdminLogin} />
                <Route
                    path="/forgotpassword"
                    exact
                    component={ForgotPassword}
                />
                <Route
                    path="/forgotpasswords/:token/:email"
                    exact
                    component={ResetPassword}
                />
                <Redirect to="/login" />
            </Switch>
        );
    } else if (props.location.pathname.startsWith("/") && token) {
        const userMenu = (
            <Menu>
                <Menu.Item key="admin">
                    <h4>
                        <UserOutlined /> Welcome, Admin
                    </h4>
                </Menu.Item>
                <Menu.Item key="/changepassword">
                    <Link to={"/changepassword"}>
                        <LockOutlined />
                        Change Password
                    </Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="/logout" onClick={() => logout()}>
                    <LogoutOutlined />
                    Logout
                </Menu.Item>
            </Menu>
        );
        const dropdown = (
            <Dropdown.Button
                style={{
                    float: "right",
                    marginTop: "20px",
                    marginRight: "-24px",
                }}
                className="dropdown-btn"
                overlay={userMenu}
                icon={
                    <UserOutlined
                        style={{
                            fontSize: "28px",
                            backgroundColor: "#f0f0f0",
                            borderRadius: "50%",
                        }}
                    />
                }
            ></Dropdown.Button>
        );
        const content = (
            <>
                <Content style={{ margin: "0 16px" }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Breadcrumb>  */}
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360 }}
                    >
                        <div>
                            <Switch>
                                <Route
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                                <Route path="/category" component={Category} />
                                <Route
                                    path="/addcategory"
                                    component={CategoryAddForm}
                                />
                                <Route
                                    path="/editcategory/:id"
                                    component={CategoryEditForm}
                                />
                                <Route
                                    path="/changepassword"
                                    component={ChangePassword}
                                />
                                <Route path="/user" component={UserList} />
                                <Route path="/event" component={Event} />
                                <Route
                                    path="/addevent"
                                    component={EventAddForm}
                                />
                                <Route
                                    path="/editevent/:id"
                                    component={EventEditForm}
                                />
                                <Route
                                    path="/participants"
                                    component={Participantes}
                                />
                                <Route path="/winners" component={Winners} />
                                <Redirect to="/dashboard" />
                            </Switch>
                        </div>
                    </div>
                </Content>
            </>
        );
        renders = (
            <>
                {" "}
                <AdminHeader content={content} dropdown={dropdown} />
            </>
        );
    }

    return renders;
};

export default PrasangAdmin;
