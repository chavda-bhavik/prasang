import axios from 'axios';
import * as types from '../actionTypes';

import { Dispatch } from 'redux';

export const FetchCategory : any = () => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type:types.INIT_CATEGORY
        })
        await axios.post(`http://localhost:3000/graphql`,
        {   query: ` query {
                        eventCategories {
                            categoryId
                            name
                            imagePath
                        }
                    }
                `          
        })
        .then((response) => {
            dispatch({
                type:types.FETCH_CATEGORY_SUCCESS,
                categoryList:response.data.data.eventCategories
            });
        }).catch((error) => {
            dispatch({
                type:types.FETCH_CATEGORY_FAILED,
                error:error.message
            });
        })
    };
};
export const AddCategory : any = (name:any,imagePath:any) => {
    return async (dispatch: Dispatch) => {
        
    };
};
