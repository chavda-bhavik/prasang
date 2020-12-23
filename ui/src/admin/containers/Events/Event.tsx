import React , {useEffect,useRef} from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { useDispatch,useSelector } from 'react-redux'

import EventList from '../../components/Event/EventList';
import {IRootState} from '../../store/store';
import { Spin, Card } from 'antd';
import * as types from '../../store/actionTypes'
import { DELETE_event,FetchEvent } from '../../store/actions/actionMethod'; 
// import { FetchCategorys } from '../../store/actions/categoryAction';

const Event = (props:any) =>{
    const dispatch = useDispatch();
    const { data, refetch,loading } = useQuery(FetchEvent);
    const [eventDels] = useMutation(DELETE_event);
    const eventList = useSelector((state:IRootState) => state.event.eventList)

    const unmounted = useRef(false);
    useEffect(()=>{
        try {
            dispatch({
                type:types.INIT_EVENT
            })
            try {
                refetch()
                dispatch({
                    type:types.FETCH_EVENT_SUCCESS,
                    eventList:data.events
                })  
            } catch (error) {
                dispatch({
                    type:types.FETCH_EVENT_FAILED,
                    error:error.message
                })
            }   
        } catch (error) {
            
        }
        return () => { unmounted.current = true }
    },[data])
    let loadder : any ="No Data Found";
    if(loading)
    {
        loadder = <Spin tip="Loading..."></Spin>
    }
    const eventDelete = async (id:string) => {
        dispatch({
            type:types.INIT_DELETE_EVENT
        })
        try {
            const response = await eventDels({variables:{eventId:id}});
            dispatch({
                type:types.DELETE_EVENT_SUCCESS,
                eventList:response.data,
                eventId:id
            })  
        } catch (error) {
            dispatch({
                type:types.DELETE_EVENT_FAILED,
                error:error.message
            })
        }
    }
    const singleEvent = async (id:string) => {
        props.history.push("/prasangadmin/editevent/"+id);
    }
    const eveLength = eventList;
    
    if(eveLength!=undefined && !loading && eveLength.length > 0)
    {
        loadder = <EventList list = {eventList} eventDelete = {eventDelete} singleEvent = { singleEvent }/>;
    }
    return(
        <>
        <div className="site-card-border-less-wrapper">
            <Card title="Event" bordered={false}>
                {loadder}
            </Card>
        </div>
        </>
    )
}

export default Event;