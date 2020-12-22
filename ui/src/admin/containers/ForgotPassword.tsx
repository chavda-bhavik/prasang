import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch,useSelector } from 'react-redux'

import ForgotPasswords from '../components/Auth/ForgotPasswords';
import * as types from '../store/actionTypes'
import { FORGOT_PASSWORD } from '../store/actions/actionMethod';
import { IRootState } from '../store/store';

const ForgotPassword= (props:any) => {
    const [forgotpassword] = useMutation(FORGOT_PASSWORD);
    const [msg,setMsg] = useState(false);
    const dispatch = useDispatch();
    const errs = useSelector((state:IRootState)=>state.auth.error);
    console.log(errs);
    const forgotpass = async (email : string) => {
        dispatch({
          type:types.INIT_FORGOT_PASSWORD
      })
      try {
          const res = await forgotpassword({variables:{email: email}});
        //   console.log(res.data.forgotPasswords.token);
          dispatch({
              type:types.FORGOT_PASSWORD_SUCCESS,
            //   token:res.data.forgotPasswords.token
          })
          setMsg(true);
        //   localStorage.setItem('myForgotToken',res.data.forgotpasswords.token);
      } catch (error) {
          dispatch({
              type:types.FORGOT_PASSWORD_FAILED,
              error:error.message
          })
          setMsg(false);
        }
      }
    return ( <> <ForgotPasswords forgotpass={forgotpass} errormsg={errs} msg={msg}/> </>)
}

export default ForgotPassword;