import React, { useEffect } from 'react';
// import AdminMainLayout from './components/common/AdminMainLayout'
import { Link } from 'react-router-dom';
import AdminHeader from './components/common/AdminHeader'
import Category from './containers/Category'
import CategoryAddForm from './containers/CategoryAddForm'
import CategoryEditForm from './containers/CategoryEditForm'
import Dashboard from './containers/Dashboard';
import ChangePassword from './containers/ChangePassword';
import PrasangAdminLogin from './containers/Auth';
import {IRootState} from './store/store';
import { Switch, Route, Redirect } from 'react-router'
import * as types from './store/actionTypes';
import { Menu, Dropdown } from 'antd';
import { useDispatch,useSelector } from 'react-redux'
import { Layout, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Content } = Layout;

const PrasangAdmin = (props:any) => {
    const dispatch = useDispatch();
    const token = useSelector((state:IRootState) => state.auth.token ? true : false)
    
    const logout = () => {
        console.log("logout={logout}")
        dispatch({
            type:types.INIT_ADMIN_LOGOUT
        })
        try {
            dispatch({
                type:types.ADMIN_LOGOUT_SUCCESS,  
            })
            localStorage.removeItem("Prasangtoken");
            props.history.push("/prasangadmin/login");  
        } catch (error) {
            dispatch({
                type:types.ADMIN_LOGOUT_FAILED,
                error:error.message
            })
        }
    }
    useEffect(() => {
        let token1 = localStorage.getItem("Prasangtoken");
        let user1 = localStorage.getItem("PrasangUser");
        if(props.location.pathname.startsWith("/prasangadmin") && !token) { 
            dispatch({
                type:"PRASANG_ADMIN_LOGIN_SUCCESS",
                user:user1,
                token:token1
            })
        }
    }, [location.pathname,token])
    
    let renders : any = <Redirect to="/prasangadmin" />;
    
    if(props.location.pathname.startsWith("/prasangadmin") && !token)
    {
        console.log("Login In " + false + " token " + token);
        renders = <Switch>
            <Route path="/prasangadmin/login" exact component={PrasangAdminLogin}/>
            <Redirect to="/prasangadmin/login" />
        </Switch>
    }
    else if(props.location.pathname.startsWith("/prasangadmin") && token)
    {
        const userMenu = (
            <Menu>
              <Menu.Item key="/prasangadmin/myprofile">View Profile</Menu.Item>
              <Menu.Item key="/prasangadmin/changepassword"><Link to={"/prasangadmin/changepassword"}>Change Password</Link></Menu.Item>
              <Menu.Divider />
              <Menu.Item key="/prasangadmin/logout" onClick={() => logout()}>Logout</Menu.Item>
            </Menu>
          );
        const dropdown = <Dropdown.Button
                style={{ float: 'right',marginTop: "20px", marginRight: "-24px" }}
                className="dropdown-btn"
                overlay={userMenu}
                icon={
                <UserOutlined
                    style={{
                    fontSize: '28px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '50%',
                    }}
                />
            }
      ></Dropdown.Button>;
        const content =
        <>
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    <Switch>
                        <Route path="/prasangadmin/dashboard" component={Dashboard} />
                        <Route path="/prasangadmin/category" component={Category} />
                        <Route path="/prasangadmin/addcategory" component={CategoryAddForm} />
                        <Route path="/prasangadmin/editcategory/:id" component={CategoryEditForm} />
                        <Route path="/prasangadmin/changepassword" component={ChangePassword} />
                        <Redirect to="/prasangadmin/dashboard" />
                    </Switch>
                </div>
            </div>
        </Content>
        </>;
        console.log("Login In " + true + " token " + token);
        renders = <> <AdminHeader content={content} dropdown={dropdown}/></>
    }
    
    return renders;
}

export default PrasangAdmin