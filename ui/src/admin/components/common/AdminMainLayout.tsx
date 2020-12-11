import React from 'react';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import AdminSlider from './AdminSlider';
const AdminHeader = (props:any) => {
    return (
    <>
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSlider/>
        </Layout>           
    </>
    )
}
export default AdminHeader;