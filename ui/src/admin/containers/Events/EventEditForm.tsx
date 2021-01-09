import React , {useEffect,useRef} from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { useDispatch , useSelector} from 'react-redux'
import * as types from '../../store/actionTypes'
import { IRootState } from '../../store/store';
import EventEdit from '../../components/Event/EventEdit';
import { Edit_Event,SINGLE_Event,FetchCategory } from '../../store/actions/actionMethod'; 

const EventEditForm = (props:any) => {
    
    const { data : event, refetch } = useQuery(SINGLE_Event,{
        variables:{eventId:props.match.params.id}
    });
    const unmounted = useRef(false);
    useEffect(()=>{
        try {
            dispatch({
                type:types.INIT_SINGLE_EVENT
            })
            try {
                refetch()
                dispatch({
                    type:types.SINGLE_EVENT_SUCCESS,
                    event:event,
                    eventId:props.match.params.id
                })  
            } catch (error) {
                dispatch({
                    type:types.SINGLE_EVENT_FAILED,
                    error:error.message
                })
            }
            
        } catch (error) {
                
        }
        return () => { unmounted.current = true }
    },[props.match.params.id,event])
    
    const eventData = useSelector((state:IRootState) => state.event.event)
    const [updateEve,{loading}] = useMutation(Edit_Event);
    const dispatch = useDispatch();
    const updateEvent = async (id:string,title: string,prize:string, categoryId: string, startDate: string, endDate: string, lastRegistraionDate: string, description: string, fees: string, image:any|string) => {
        if(typeof image === 'string')
        {
            if(image.includes("http"))
            {
                image = "";
            }
        }
        dispatch({
            type:types.INIT_EDIT_EVENT
        })
        try {
            const response = await updateEve({variables:{eventId:id,title: title,categoryId:categoryId,startDate:startDate,endDate:endDate,lastRegistraionDate:lastRegistraionDate,description:description,fees: parseInt(fees),priceAmount: parseInt(prize),image:image}});
            dispatch({
                type:types.EDIT_EVENT_SUCCESS,
                eventList:response.data
            })  
        } catch (error) {
            dispatch({
                type:types.EDIT_EVENT_FAILED,
                error:error.message
            })
        }
        props.history.push("/prasangadmin/event");
    }
   
    const { data } = useQuery(FetchCategory);
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
    let editData : any = "";
    const catLength = categoryList; 
    if(catLength!=undefined && catLength.length > 0)
    {
        editData = (eventData) ? <EventEdit updateEvent = {updateEvent} singleEdit = {eventData} category = {categoryList} loading={loading}/> : null
    }
    return (
        <>
           {editData}
        </>
    )
}

export default EventEditForm;
