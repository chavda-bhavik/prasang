import React,{useState} from 'react';
import ChangePasswords from '../components/Auth/ChangePassword';
import { gql, useMutation,useQuery } from '@apollo/client';
import { useDispatch , useSelector} from 'react-redux'
import * as types from '../store/actionTypes'

const Change_Password = gql`
  mutation changePassword($oldPassword:String!,$password:String!){
    changePassword(data:{
      oldPassword:$oldPassword
      password:$password
    }){
      name
      email
    }
  }
`;

const ChangePassword = (props:any) => {
    const [newPassword] = useMutation(Change_Password);
    const [errors,setError] = useState(false);
    const dispatch = useDispatch();

    const changePassword = async (oldPassword:string,password:any) => {
        dispatch({
            type:types.INIT_CHANGE_PASSWORD
        })
        try {
            const response = await newPassword({variables:{oldPassword: oldPassword,password:password}});
            console.log(response);
            setError(false);
            dispatch({
                type:types.CHANGE_PASSWORD_SUCCESS,
            })  
            console.log(errors);
            props.history.push("/prasangadmin/dashboard");
        } catch (error) {
          setError(true);
            console.log(error.message + errors);
            dispatch({
                type:types.CHANGE_PASSWORD_FAILED,
                error:error.message
            })
        }
    }
    return ( <> 
        <ChangePasswords changePassword={changePassword} err = { errors }/>
    </>)
}

export default  ChangePassword;