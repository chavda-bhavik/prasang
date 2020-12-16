import React,{useState} from 'react';
import { Layout } from 'antd';
import AdminContent from './AdminContent';
import "antd/dist/antd.css";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

const { Header, Footer } = Layout;

const AdminLayout = (props:any) => {
  const[collapsed,setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
    return (
    <>
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
export default AdminLayout;