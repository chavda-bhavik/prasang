import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../../images/prasang.png";
import "antd/dist/antd.css";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import "./Admin.module.css";
const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminHeader = (props: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <img
                        className="logo"
                        height="60px"
                        width="80ox"
                        src={Logo}
                        alt=""
                    />

                    <Menu
                        theme="dark"
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                    >
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to="/dashboard">Dashboard</Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            icon={<UserOutlined />}
                            title="Category"
                        >
                            <Menu.Item key="/category">
                                <Link to="/category">Category</Link>
                            </Menu.Item>
                            <Menu.Item key="/addcategory">
                                <Link to="/addcategory">Add Category</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            icon={<TeamOutlined />}
                            title="Event"
                        >
                            <Menu.Item key="/event">
                                <Link to="/event">Event</Link>
                            </Menu.Item>
                            <Menu.Item key="/addevent">
                                <Link to="/addevent">Add Event</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="2" icon={<PieChartOutlined />}>
                            <Link to="/user">User</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="sub3"
                            icon={<TeamOutlined />}
                            title="Participants"
                        >
                            <Link to="/participants">Participants</Link>
                        </Menu.Item>
                        {/* <SubMenu key="sub4" icon={<TeamOutlined />} title="Winners">
              <Menu.Item key="sub5">
                <Link to="/winners">Decide Winners</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/winners/list">List Winners</Link>
              </Menu.Item>
            </SubMenu> */}
                        <Menu.Item
                            key="sub4"
                            icon={<TeamOutlined />}
                            title="Winners"
                        >
                            <Link to="/winners">Winners</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{ paddingLeft: "10px", background: "white" }}
                    >
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: toggle,
                            }
                        )}

                        {props.dropdown}
                    </Header>
                    {/* {props.Main_Content} */}
                    {props.content}
                    <Footer style={{ textAlign: "center" }}>
                        Prasang ©2020 Created by Prasang Team
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};
export default AdminHeader;
