import React , {useEffect,useState,useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux'

import { useMutation,useQuery } from '@apollo/client';
import { Spin } from 'antd';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import {IRootState} from '../store/store';
import * as types from '../store/actionTypes'
import { adminDashboard } from '../store/actions/actionMethod';

const Dashboard = (props:any) => {
    const dispatch = useDispatch();
    const { data, refetch,loading } = useQuery(adminDashboard);
    const unmounted = useRef(false);
    useEffect(()=>{
        try {
            dispatch({
                type:types.INIT_FETCH_DASHBOARD
            })
            try {
                refetch()
                dispatch({
                    type:types.FETCH_DASHBOARD_SUCCESS,
                    dashboards:data.Dashboard
                })  
            } catch (error) {
                dispatch({
                    type:types.FETCH_DASHBOARD_FAILED,
                    error:error.message
                })
            }   
        } catch (error) {
            
        }
        return () => { unmounted.current = true }
    },[data])

    const dashList = useSelector((state:IRootState) => state.dashboard.dashboards)
    let loadder : any ="";
    if(loading)
    {
        loadder = <Spin tip="Loading..."></Spin>
    }
    
    const dashLength = dashList;
    if(dashLength!=undefined && !loading)
    {
        loadder = <AdminDashboard dash={dashList}/>;
    }

    return ( <> 
        {loadder}
    </>)
}

export default  Dashboard;