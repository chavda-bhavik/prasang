import React , {useEffect,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux'

import { useMutation,useQuery } from '@apollo/client';
import { Spin, Empty, Card } from 'antd';

import User from '../components/User/User';
import {IRootState} from '../store/store';
import * as types from '../store/actionTypes'
import { FetchUser,Enable_Disable_USER } from '../store/actions/actionMethod';

const UserList = (props:any) => {
    const dispatch = useDispatch();
    const { data, refetch,loading } = useQuery(FetchUser);
    const unmounted = useRef(false);
    useEffect(()=>{
        try {
            dispatch({
                type:types.INIT_FETCH_USER
            })
            try {
                refetch()
                dispatch({
                    type:types.FETCH_USER_SUCCESS,
                    userList:data.users
                })  
            } catch (error) {
                dispatch({
                    type:types.FETCH_USER_FAILED,
                    error:error.message
                })
            }   
        } catch (error) {
            
        }
        return () => { unmounted.current = true }
    },[data])
    
    const userList = useSelector((state:IRootState) => state.user.userList)
    let loadder : any =<Empty/>;
    if(loading)
    {
        loadder = <Spin tip="Loading..."></Spin>
    }
    const [enableUser] = useMutation(Enable_Disable_USER);

    const enableUsers = async (id:string,enable:Boolean) => {
        dispatch({
            type:types.INIT_EDIT_USER
        })
        try {
            refetch()
            const response = await enableUser({variables:{userId:id,IsEnable:enable}});
            dispatch({
                type:types.EDIT_USER_SUCCESS,
                userId:id,
                enable:enable
            })  
        } catch (error) {
            dispatch({
                type:types.EDIT_USER_FAILED,
                error:error.message
            })
        }
    }

    const userLength = userList;
    
    if(userLength!=undefined && !loading && userLength.length > 0)
    {
        loadder = <User list = {userList} enable={enableUsers}/>;
    }

    return ( <> 
        <div className="site-card-border-less-wrapper">
            <Card title="User" bordered={false}>
                {loadder}
            </Card>
        </div>
    </>)
}

export default UserList;