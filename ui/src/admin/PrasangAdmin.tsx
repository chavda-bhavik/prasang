import React, { useEffect } from 'react';
// import AdminMainLayout from './components/common/AdminMainLayout'
import { Link } from 'react-router-dom';
import AdminHeader from './components/common/AdminHeader'
import Category from './containers/Category'
import CategoryAddForm from './containers/CategoryAddForm'
import CategoryEditForm from './containers/CategoryEditForm'
import Event from './containers/Events/Event'
import EventAddForm from './containers/Events/EventAddForm'
import EventEditForm from './containers/Events/EventEditForm'
import Dashboard from './containers/Dashboard';
import ChangePassword from './containers/ChangePassword';
import ForgotPassword from './containers/ForgotPassword';
import PrasangAdminLogin from './containers/Auth';
import ResetPassword from './containers/ResetPassword';
import UserList from './containers/UserList';
import {IRootState} from './store/store';
import { Switch, Route, Redirect } from 'react-router'
import * as types from './store/actionTypes';
import { Menu, Dropdown,Layout, Breadcrumb } from 'antd';
import { useDispatch,useSelector } from 'react-redux'
import { UserOutlined,LogoutOutlined,LockOutlined } from '@ant-design/icons';
import { userProfile } from './store/actions/actionMethod';
import { useQuery } from '@apollo/client';
import Participantes from './containers/Participants';
import Winners from './containers/Winners';

const { Content } = Layout;

const PrasangAdmin = (props:any) => {
    const dispatch = useDispatch();
    const { data, refetch,loading } = useQuery(userProfile);
    const { location } = props;
    const token = useSelector((state:IRootState) => state.auth.token ? true : false)
    
    const logout = () => {
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
        let tokens = localStorage.getItem("Prasangtoken");
        if(props.location.pathname.startsWith("/prasangadmin") && !token) {
            refetch()
            if(!loading && data) 
            {
                dispatch({
                    type:"PRASANG_ADMIN_LOGIN_SUCCESS",
                    user:data.usersProfile,
                    token:tokens
                })
            }
        }
    }, [location.pathname,token,data])
    
    let renders : any = <Redirect to="/prasangadmin" />;
    
    if(props.location.pathname.startsWith("/prasangadmin") && !token)
    {
        renders = <Switch>
            <Route path="/prasangadmin/login" exact component={PrasangAdminLogin}/>
            <Route path="/prasangadmin/forgotpassword" exact component={ForgotPassword}/>
            <Route path="/prasangadmin/forgotpasswords/:token/:email" exact component={ResetPassword}/>
            <Redirect to="/prasangadmin/login" />
        </Switch>
    }
    else if(props.location.pathname.startsWith("/prasangadmin") && token)
    {
        const userMenu = (
            <Menu>
              <Menu.Item key="admin"><h4><UserOutlined /> Welcome, Admin</h4></Menu.Item>  
              <Menu.Item key="/prasangadmin/changepassword"><Link to={"/prasangadmin/changepassword"}><LockOutlined />Change Password</Link></Menu.Item>
              <Menu.Divider />
              <Menu.Item key="/prasangadmin/logout" onClick={() => logout()}><LogoutOutlined />Logout</Menu.Item>
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
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Breadcrumb>  */}
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    <Switch>
                        <Route path="/prasangadmin/dashboard" component={Dashboard} />
                        <Route path="/prasangadmin/category" component={Category} />
                        <Route path="/prasangadmin/addcategory" component={CategoryAddForm} />
                        <Route path="/prasangadmin/editcategory/:id" component={CategoryEditForm} />
                        <Route path="/prasangadmin/changepassword" component={ChangePassword} />
                        <Route path="/prasangadmin/user" component={UserList} />
                        <Route path="/prasangadmin/event" component={Event} />
                        <Route path="/prasangadmin/addevent" component={EventAddForm} />
                        <Route path="/prasangadmin/editevent/:id" component={EventEditForm} />
                        <Route path="/prasangadmin/participants" component={Participantes} />
                        <Route path="/prasangadmin/winners" component={Winners} />
                        <Redirect to="/prasangadmin/dashboard" />
                    </Switch>
                </div>
            </div>
        </Content>
        </>;
        renders = <> <AdminHeader content={content} dropdown={dropdown}/></>
    }
    
    return renders;
}

export default PrasangAdmin