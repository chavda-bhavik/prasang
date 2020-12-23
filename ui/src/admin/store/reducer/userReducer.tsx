import {IUsers} from './types';
import * as types from '../actionTypes';

export let initialState: IUsers = {
    userList:[],
    error:"",
    loading:false,
    userId:null,
    enable:true
};

const store = (state=initialState,action:any) => {
    switch (action.type){
        case types.INIT_FETCH_USER:
            return {
                ...state,
                loading:true
            };
        case types.FETCH_USER_SUCCESS:
            return {
                ...state,
                userList:action.userList,
                loading:false
            }
        case types.FETCH_USER_FAILED:
            return {
                ...state,
                error:action.error,
                loading:true
            };
        case types.INIT_EDIT_USER:
            return {
                ...state,
                loading:true
            };
        case types.EDIT_USER_SUCCESS:
            const old = [...state.userList].map((item)=>{
                if(item.userId === action.userId)
                {
                    return { 
                        ...item,
                        IsEnable: action.enable
                    }
                } else return { ...item }
            });
            // const oldLength = old.length;
            // console.log(old);
            // for(let i = 0;i<oldLength;i++)
            // {
            //     console.log(old[i].userId + " = " +action.userId);
            //     console.log(old[i].IsEnable + " = " +action.enable);
            //     if(old[i].userId == action.userId)
            //     {
            //         old[i].IsEnable = action.enable;
            //     }
            // }
            console.log(old);     
            return {
                ...state,
                userList:old,
                error:null,
                loading:false
            }
        case types.EDIT_USER_FAILED:
            return {
                ...state,
                error:action.error,
                loading:true
            };    
        default:
            return state;
    }
}
export default store;
