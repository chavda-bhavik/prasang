import {ICategorys} from './types';
import * as types from '../actionTypes';

export let initialState: ICategorys = {
    categoryList:[],
    category:{},
    categoryId:""
};

const store = (state=initialState,action:any) => {
    switch (action.type){
        case types.INIT_CATEGORY:
            return {
                ...state,
            };
        case types.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryList:action.categoryList
            }
        case types.FETCH_CATEGORY_FAILED:
            return {
                ...state,
                error:action.error
            };
        case types.INIT_ADD_DATA:
            return {
                ...state,
            };
        case types.ADD_DATA_SUCCESS:
            return {
                ...state
            }
        case types.ADD_DATA_FAILED:
            return {
                ...state,
                error:action.error
            };
        case types.INIT_DELETE_CATEGORY:
            return {
                ...state,
            };
        case types.DELETE_DATA_SUCCESS:
            console.log(action.categoryId)
            let cat = state.categoryList.filter(category => category.categoryId !== action.categoryId );
            return {
                ...state,
                categoryList:cat
            }
        case types.DELETE_DATA_FAILED:
            return {
                ...state,
                error:action.error
            };   
        case types.INIT_SINGLE_CATEGORY:
            return {
                ...state,
            };
        case types.SINGLE_DATA_SUCCESS:
            return {
                ...state,
                category:action.category
            }
        case types.SINGLE_DATA_FAILED:
            return {
                ...state,
                error:action.error
            };  
        case types.INIT_EDIT_CATEGORY:
            return {
                ...state,
            };
        case types.EDIT_DATA_SUCCESS:
            return {
                ...state
            }
        case types.EDIT_DATA_FAILED:
            return {
                ...state,
                error:action.error
            };     
        default:
            return state;
    }
}
export default store;
