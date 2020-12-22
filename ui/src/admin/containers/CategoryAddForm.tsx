import React from 'react';
import CategoryAdd from '../components/Category/CategoryAdd';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux'
import * as types from '../store/actionTypes'
import { ADD_Category } from '../store/actions/actionMethod'; 

const CategoryAddForm = (props:any) => {
    
    // const { loading } = useQuery(FetchCategory);
    const [addCat,{loading}] = useMutation(ADD_Category);

    const dispatch = useDispatch();

    const addCategory = async (name:string,image:any) => {
        dispatch({
            type:types.INIT_ADD_DATA
        })
        try {
            const response = await addCat({variables:{name: name,image:image}});
            dispatch({
                type:types.ADD_DATA_SUCCESS,
                categoryList:response.data
            })  
        } catch (error) {
            dispatch({
                type:types.ADD_DATA_FAILED,
                error:error.message
            })
        }
        props.history.push("/prasangadmin/category");
    }
    return (
        <>
            <CategoryAdd addCategory = {addCategory} loading={loading}/>            
        </>
    )
}

export default CategoryAddForm;
