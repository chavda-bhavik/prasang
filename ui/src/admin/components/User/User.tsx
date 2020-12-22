import React from 'react';
import { Table, Switch,Alert } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
const moment = require('moment');

const User = (props:any) => {

  const columns = [
      {
          title: '#',
          dataIndex: 'index',
          key: 'index',
      },
      {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',    
      },
      {
          title: 'Email',
          dataIndex: 'email',
          key: 'Email',
      },
      {
        title: 'UserName',
        dataIndex: 'username',
        key: 'username',
      },
      {
          title: 'ContactNo',
          dataIndex: 'contactNo',
          key: 'ContactNo',
      },
      {
        title: 'Joining Date',
        dataIndex: 'createdAt',
        key: 'Joining Date',
    },
    {
        title: 'Enable',
        dataIndex: 'IsEnable',
        key: 'Enable'
    }
  ];
  

  const data : any = (list:any,enableHandler:any) => {
      let userArr : any = [];
      for(let i = 0;i<list.length;i++)
      {
          userArr.push({
              key:i+1,
              index:i+1,
              name:list[i].name,
              email:list[i].email,
              username:list[i].username,
              contactNo:list[i].contactNo,
              createdAt:moment(+list[i].createdAt).format("D/MM/yyyy"),
              IsEnable:(list[i].IsEnable) ?
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onClick={() => enableHandler(list[i].userId,false)}
                checked
                /> :
                <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onClick={() => enableHandler(list[i].userId,true)}
                />
            // <Alert message="Enable" type="success" style={{cursor:'pointer'}} onClick={() => enableHandler(list[i].userId,false)}/> 
            // : <Alert message="Disable" type="info" style={{cursor:'pointer'}} onClick={() => enableHandler(list[i].userId,true)}/>
          });            
      }
      return userArr;
  } 
  return(
      <>
          <Table columns={columns} pagination={{ pageSize: 4 }}  dataSource={data(props.list,props.enable)}/>
      </>
  )
}

export default User;