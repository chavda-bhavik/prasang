import axios from 'axios';
import * as types from '../actionTypes';
import { gql, useMutation,useQuery } from '@apollo/client';
import { ADD_Category,Edit_Category,DELETE_Category,FetchCategory } from './actionMethod';
import { Dispatch } from 'redux';
import { useDispatch,useSelector } from 'react-redux'

export const FetchCategorys : any = () => {
    const { data, refetch,loading } = useQuery(FetchCategory);
    const dispatch = useDispatch();
    
    return async () => {
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
    };
};
export const AddCategory : any = (name:any,imagePath:any) => {
    return async (dispatch: Dispatch) => {
        
    };
};
