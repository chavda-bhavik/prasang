import {IAuth} from './types';
import * as types from '../actionTypes';

export let initialState: IAuth = {
    userList: [],
    user:null,
    token:null,
    userId:"",
    loading:false,
    error:""
};

const store = (state=initialState,action:any) => {
    switch (action.type){
        
        case types.INIT_ADMIN_LOGIN:
            return {
                ...state,
                loading:true
            };
        case types.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                token:action.token,
                user:action.user,
                loading:false
            }
        case types.ADMIN_LOGIN_FAILED:
            return {
                ...state,
                error:action.error,
                loading:false
            };
        case types.INIT_CHANGE_PASSWORD:
            return {
                ...state,
                loading:true
            };
        case types.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false
            }

        case types.INIT_ADMIN_LOGOUT:
            return {
                ...state
            };
    
        case types.ADMIN_LOGOUT_SUCCESS:
            return {
                ...state,
                user:null,
                token:null
            }
        case types.ADMIN_LOGOUT_FAILED:
            return {
                ...state,
                error:action.error,
            };    

        case "PRASANG_ADMIN_LOGIN_SUCCESS":
            return {
                ...state,
                token:action.token,
                user:action.user,
                loading:false
            };    
        default:
            return state;
    }
}
export default store;
