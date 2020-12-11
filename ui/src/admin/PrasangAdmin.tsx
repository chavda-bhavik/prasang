import React from 'react';
import {Route,Switch} from 'react-router';
// import AdminHeader from './components/common/AdminHeader'
import AdminMainLayout from './components/common/AdminMainLayout'
import Category from './containers/Category'
import CategoryAddForm from './containers/CategoryAddForm'
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;

// let Main_Content = <Content style={{ margin: '0 16px' }}>
// <Breadcrumb style={{ margin: '16px 0' }}>
//   <Breadcrumb.Item>Admin</Breadcrumb.Item>
//   <Breadcrumb.Item>Category</Breadcrumb.Item>
// </Breadcrumb>
// <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
//   <div>
//       <Switch>
//         <Route path="/prasangadmin/category" component={Category} />
//         <Route path="/prasangadmin/addcategory" component={CategoryAddForm} />
//       </Switch>
//   </div>
// </div>
// </Content>

const PrasangAdmin = (props:any) => {
    return <>
        {/* <AdminHeader Main_Content={Main_Content}/> */}
        <AdminMainLayout/>
    </>
}

export default PrasangAdmin