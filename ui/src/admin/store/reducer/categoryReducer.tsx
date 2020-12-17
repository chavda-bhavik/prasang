import {ICategorys} from './types';
import * as types from '../actionTypes';

export let initialState: ICategorys = {
    categoryList:[],
    category:{},
    categoryId:"",
    error:"",
    loading:false
};

const store = (state=initialState,action:any) => {
    switch (action.type){
        case types.INIT_CATEGORY:
            return {
                ...state,
                loading:true
            };
        case types.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryList:action.categoryList,
                loading:false
            }
        case types.FETCH_CATEGORY_FAILED:
            return {
                ...state,
                error:action.error,
                loading:true
            };
        case types.INIT_ADD_DATA:
            return {
                ...state,
                loading:true
            };
        case types.ADD_DATA_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case types.ADD_DATA_FAILED:
            return {
                ...state,
                error:action.error,
                loading:false
            };
        case types.INIT_DELETE_CATEGORY:
            return {
                ...state,
                loading:true
            };
        case types.DELETE_DATA_SUCCESS:
            console.log(action.categoryId)
            let cat = state.categoryList.filter(category => category.categoryId !== action.categoryId );
            return {
                ...state,
                categoryList:cat,
                loading:false
            }
        case types.DELETE_DATA_FAILED:
            return {
                ...state,
                error:action.error,
                loading:false
            };   
        case types.INIT_SINGLE_CATEGORY:
            return {
                ...state,
                loading:true
            };
        case types.SINGLE_DATA_SUCCESS:
            return {
                ...state,
                category:action.category,
                loading:false
            }
        case types.SINGLE_DATA_FAILED:
            return {
                ...state,
                error:action.error,
                loading:false
            };  
        case types.INIT_EDIT_CATEGORY:
            return {
                ...state,
                loading:true
            };
        case types.EDIT_DATA_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case types.EDIT_DATA_FAILED:
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
