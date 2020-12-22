import {IDashboard} from './types';
import * as types from '../actionTypes';

export let initialState: IDashboard = {
    dashboards:{},
    error:"",
    loading:false,
};

const store = (state=initialState,action:any) => {
    switch (action.type){
        case types.INIT_FETCH_DASHBOARD:
            return {
                ...state,
            };
        case types.FETCH_DASHBOARD_SUCCESS:
            return {
                ...state,
                dashboards:action.dashboards
            }
        case types.FETCH_DASHBOARD_FAILED:
            return {
                ...state,
                error:action.error
            };
        default:
            return state;
    }
}
export default store;
