import React,{useState} from 'react';
import { gql, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux'

import * as types from '../store/actionTypes'
import Login from '../components/Auth/Login'; 

import './css/main.css';
import './css/util.css';

const Login_Admin = gql`
  mutation login($email:String!,$password:String!){
    login(data:{
            email:$email,
            password:$password}){
      token
      user {
        userId
        name
        email
        username
      }
    }
  }
`;

const Auth = (props:any) =>{
  const [login] = useMutation(Login_Admin);
  const [err,setErr] = useState(false);
  const dispatch = useDispatch();
  const loginAdmin = async (email : string, password : string) => {
    dispatch({
      type:types.INIT_ADMIN_LOGIN
  })
  try {
      const response = await login({variables:{email: email,password:password}});
      dispatch({
          type:types.ADMIN_LOGIN_SUCCESS,
          user:response.data.login.user,
          token:response.data.login.token
      })
      let userData =await response.data.login.user;
      console.log(userData);
      localStorage.setItem("Prasangtoken", response.data.login.token);
      await localStorage.setItem("PrasangUser", userData);
      props.history.push("/prasangadmin/dashboard");  
  } catch (error) {
      dispatch({
          type:types.ADMIN_LOGIN_FAILED,
          error:error.message
      })
      setErr(true);
  }
  
  }
    return(
        <>
          <Login loginAdmin={loginAdmin} errormsg={err}/>
        </>
    )
}

export default Auth;