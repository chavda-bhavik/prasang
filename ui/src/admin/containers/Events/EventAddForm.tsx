import React , { useEffect } from 'react';
import EventAdd from '../../components/Event/EventAdd';
import { useMutation,useQuery } from '@apollo/client';
import { useDispatch , useSelector} from 'react-redux'
import * as types from '../../store/actionTypes'
import { ADD_Event,FetchCategory } from '../../store/actions/actionMethod'; 
import {IRootState} from '../../store/store';

const EventAddForm = (props:any) => {
    const [addEvents,{loading}] = useMutation(ADD_Event);
    
    const dispatch = useDispatch();
    
    const { data, refetch } = useQuery(FetchCategory);
    const categoryList = useSelector((state:IRootState) => state.category.categoryList)
    useEffect(()=>{
        try {
            dispatch({
                type:types.INIT_CATEGORY
            })
            try {
                refetch()
                dispatch({
                    type:types.FETCH_CATEGORY_SUCCESS,
                    categoryList:data.eventCategories
                })  
            } catch (error) {
                dispatch({
                    type:types.FETCH_CATEGORY_FAILED,
                    error:error.message
                })
            }   
        } catch (error) {
            
        }
    },[data])

    const addEvent = async (title: string,prize:string, categoryId: string, startDate: string, endDate: string, lastRegistraionDate: string, description: string, fees: string, image: string) => {
        dispatch({
            type:types.INIT_EVENT_DATA
        })
        try {
            const response = await addEvents({variables:{title: title,categoryId:categoryId,startDate:startDate,endDate:endDate,lastRegistraionDate:lastRegistraionDate,description:description,fees: parseInt(fees),priceAmount: parseInt(prize),image:image}});
            dispatch({
                type:types.ADD_EVENT_SUCCESS,
                eventList:response.data
            })  
        } catch (error) {
            dispatch({
                type:types.ADD_EVENT_FAILED,
                error:error.message
            })
        }
        props.history.push("/prasangadmin/event");
    }
    let addData : any = "";
    const catLength = categoryList; 
    
    if(catLength!=undefined && catLength.length > 0)
    {
        addData = <EventAdd insertEvent = {addEvent} loading={loading} category = {categoryList}/>            
    }
    return (
        <>
            {addData}            
        </>
    )
}

export default EventAddForm;
