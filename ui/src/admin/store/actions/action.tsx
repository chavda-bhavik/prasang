import axios from 'axios';
import * as types from '../actionTypes';

import { Dispatch } from 'redux';

export const FetchData : any = (id:String) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type:types.INIT_DATA
        })
        await axios.get(`http://localhost:3000/graphql`,{
            headers: {"Access-Control-Allow-Origin": "*"},
            responseType: 'json',
        })
        .then((response) => {
            dispatch({
                type:types.FETCH_DATA_SUCCESS,
                myData:response.data
            });
        }).catch((error) => {
            dispatch({
                type:types.FETCH_DATA_FAILED,
                error:error.message
            });
        })
    };
};
export const AddData : any = (id:String,comment:String) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type:types.INIT_ADD_DATA
        })
        await axios.get(`http://localhost:3000/graphql`,{
            headers: {"Access-Control-Allow-Origin": "*"},
            responseType: 'json',
        })
        .then((response) => {
            dispatch({
                type:types.ADD_DATA_SUCCESS,
                myData: { data : response.data,id,comment }
            });
        }).catch((error) => {
            dispatch({
                type:types.ADD_DATA_FAILED,
                error:error.message
            });
        })
    };
};
