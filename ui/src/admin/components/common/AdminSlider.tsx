import React,{useState} from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import AdminContent from './AdminContent';
import Logo from '../../../images/prasang.png'
import "antd/dist/antd.css";
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

const {Header, Sider , Footer } = Layout;
const { SubMenu } = Menu;

const AdminSlider = (props:any) => {
  const[collapsed,setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
    return (
    <>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <img className="logo" height="60px" width="80ox" src={Logo}/>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Dashboard
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Category">
              <Menu.Item key="/category"><Link to="/category">Category</Link></Menu.Item>
              <Menu.Item key="/addcategory"><Link to="/addcategory">Add Category</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Event">
              <Menu.Item key="6">View</Menu.Item>
              <Menu.Item key="8">Add</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ paddingLeft: "10px" , background:"white" }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
                })}
            </Header>
            <AdminContent/>
            {/* {props.Main_Content} */}
            <Footer style={{ textAlign: 'center' }}>Prasang ©2020 Created by Prasang Team</Footer>
        </Layout>
    </>
    )
}
export default AdminSlider;