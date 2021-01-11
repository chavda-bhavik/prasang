import React, { useEffect } from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { useDispatch,useSelector } from 'react-redux'
import {IRootState} from '../store/store';
import * as types from '../store/actionTypes'
import { FORGOT_PASSWORDS,userProfile } from '../store/actions/actionMethod';
import ResetPasswords from '../components/Auth/ResetPassword';

const ResetPassword= (props:any) => {
    // const { data, loading, error } = useQuery(userProfile);
    // if(!loading)
    //     console.log(data);
        
    // useEffect(()=>{
    //     // if(props.match.params.email){}
    //     // refetch()
    //     console.log(data);
    //         if(!loading && data) 
    //         {
    //             console.log(data);
    //         }
    // },[props.match.params,data])
    const [forgotpassword] = useMutation(FORGOT_PASSWORDS);
    const dispatch = useDispatch();

    const resetpass = async (password : string) => {
        dispatch({
          type:types.INIT_RESET_PASSWORD
      })
      try {
            await forgotpassword({variables:{email:props.match.params.email,password: password}});
            dispatch({
                type:types.RESET_PASSWORD_SUCCESS
            })
            props.history.push("/login");
      } catch (error) {
          dispatch({
              type:types.RESET_PASSWORD_FAILED,
              error:error.message
          })
      }
    }
    return ( <> <ResetPasswords resetPass={resetpass}/> </>)
}

export default ResetPassword;