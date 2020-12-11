import React,{useState} from 'react';
import {Route,Switch} from 'react-router';
import Category from '../../containers/Category'
import CategoryAddForm from '../../containers/CategoryAddForm'
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

const AdminContent = (props:any) => {
    return (
    <>
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <div>
                    <Switch>
                        <Route path="/prasangadmin/category" component={Category} />
                        <Route path="/prasangadmin/addcategory" component={CategoryAddForm} />
                    </Switch>
                </div>
            </div>
        </Content>           
    </>
    )
}
export default AdminContent;