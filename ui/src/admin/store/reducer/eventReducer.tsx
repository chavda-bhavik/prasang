import {IEvent} from './types';
import * as types from '../actionTypes';

export let initialState: IEvent = {
    eventList:[],
    event:{},
    eventId:"",
    loading:false,
    error:""
};

const store = (state=initialState,action:any) => {
    switch (action.type){
        case types.INIT_EVENT:
            return {
                ...state,
                loading:true
            };
        case types.FETCH_EVENT_SUCCESS:
            return {
                ...state,
                eventList:action.eventList,
                loading:false
            }
        case types.FETCH_EVENT_FAILED:
            return {
                ...state,
                error:action.error,
                loading:true
            };
        case types.INIT_EVENT_DATA:
            return {
                ...state,
                loading:true
            };
        case types.ADD_EVENT_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case types.ADD_EVENT_FAILED:
            return {
                ...state,
                error:action.error,
                loading:false
            };
        case types.INIT_DELETE_EVENT:
            return {
                ...state,
                loading:true
            };
        case types.DELETE_EVENT_SUCCESS:
            let events = state.eventList.filter(event => event.eventId !== action.eventId );
            console.log("Called");
            return {
                ...state,
                eventList:events,
                loading:false
            }
        case types.DELETE_EVENT_FAILED:
            return {
                ...state,
                error:action.error,
                loading:false
            };   
        case types.INIT_SINGLE_EVENT:
            return {
                ...state,
                loading:true
            };
        case types.SINGLE_EVENT_SUCCESS:
            return {
                ...state,
                event:action.event,
                loading:false
            }
        case types.SINGLE_EVENT_FAILED:
            return {
                ...state,
                error:action.error,
                loading:false
            };  
        case types.INIT_EDIT_EVENT:
            return {
                ...state,
                loading:true
            };
        case types.EDIT_EVENT_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case types.EDIT_EVENT_FAILED:
            return {
                ...state,
                error:action.error,
                loading:false
            };     
        default:
            return state;
    }
}
export default store;
