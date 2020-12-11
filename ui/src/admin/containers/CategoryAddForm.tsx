import React from 'react';
import CategoryAdd from '../components/Category/CategoryAdd';
import { gql, useMutation } from '@apollo/client';
import { useDispatch , useSelector} from 'react-redux'
import * as types from '../store/actionTypes'

const ADD_Category = gql`
    mutation addEventCategory($name:String!,$image:Upload!){
        addEventCategory(name: $name, image: $image){
        categoryId
        name
        imagePath
    }
  }
`;
const CategoryAddForm = (props:any) => {
    
    const [addCat] = useMutation(ADD_Category);
    
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
            <CategoryAdd addCategory = {addCategory}/>            
        </>
    )
}

export default CategoryAddForm;
