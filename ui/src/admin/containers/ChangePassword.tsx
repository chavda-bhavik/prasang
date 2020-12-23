import React,{useState} from 'react';
import ChangePasswords from '../components/Auth/ChangePasswords';
import { useMutation } from '@apollo/client';
import { useDispatch , useSelector } from 'react-redux'
import {IRootState} from '../store/store';
import { Card, notification } from 'antd';
import * as types from '../store/actionTypes'
import { Change_Password } from '../store/actions/actionMethod';

const Context = React.createContext({ name: 'Default' });

const ChangePassword = (props:any) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement:any) => {
    api.info({
      message: `Password Changed Successfuly!`,
      description: <Context.Consumer>{({ name }) => ``}</Context.Consumer>,
      placement,
    });
  };

    const [newPassword] = useMutation(Change_Password);
    const [errors,setError] = useState(false);
    const [pass,setPass] = useState(false);
    const dispatch = useDispatch();

    const changePassword = async (oldPassword:string,password:any) => {
        dispatch({
            type:types.INIT_CHANGE_PASSWORD,
            error:null
        })
        try {
            const response = await newPassword({variables:{oldPassword: oldPassword,password:password}});
            openNotification('topRight');
            setPass(true);
            setError(false);
            dispatch({
                type:types.CHANGE_PASSWORD_SUCCESS,
                error:null
            })  
        } catch (error) {
          setError(true);
            dispatch({
                type:types.CHANGE_PASSWORD_FAILED,
                error:error.message
            })
        }
    }
    const errorPassword = useSelector((state:IRootState) => state.auth.error)
    return ( <> 
      {contextHolder}
      <div className="site-card-border-less-wrapper">
          <Card title="Change Password" bordered={false}>
            <ChangePasswords changePassword={changePassword} err = { errors } errs= { errorPassword } pass={pass}/>
          </Card>
      </div>    
    </>)
}

export default  ChangePassword; 