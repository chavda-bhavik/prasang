import React , {useEffect,useRef} from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { useDispatch , useSelector} from 'react-redux'
import * as types from '../store/actionTypes'
import {IRootState} from '../store/store';
import CategoryEdit from '../components/Category/CategoryEdit';
import { Edit_Category,SINGLE_Category } from '../store/actions/actionMethod'; 

const CategoryEditForm = (props:any) => {
    
    const { data, refetch } = useQuery(SINGLE_Category,{
        variables:{categoryId:props.match.params.id}
    });
    const categoryData = useSelector((state:IRootState) => state.category.category)
    const unmounted = useRef(false);
    useEffect(()=>{
        try {
            dispatch({
                type:types.INIT_SINGLE_CATEGORY
            })
            try {
                refetch()
                dispatch({
                    type:types.SINGLE_DATA_SUCCESS,
                    category:data,
                    categoryId:props.match.params.id
                })  
            } catch (error) {
                dispatch({
                    type:types.SINGLE_DATA_FAILED,
                    error:error.message
                })
            }
            
        } catch (error) {
                
        }
        return () => { unmounted.current = true }
    },[props.match.params.id,data])
    
    
    const [updateCat,{loading}] = useMutation(Edit_Category);
    const dispatch = useDispatch();
    
    const updateCategory = async (id:string,name:string,image:any|string) => {
        if(typeof image === 'string')
        {
            if(image.includes("http"))
            {
                image = "";
            }

        }
        dispatch({
            type:types.INIT_EDIT_CATEGORY
        })
        try {
            const response = await updateCat({variables:{categoryId:id,name: name,image:image}});
            dispatch({
                type:types.EDIT_DATA_SUCCESS,
                categoryList:response.data
            })  
        } catch (error) {
            dispatch({
                type:types.EDIT_DATA_FAILED,
                error:error.message
            })
        }
        props.history.push("/prasangadmin/category");
    }
    return (
        <>
           {(categoryData) ? <CategoryEdit updateCategory = {updateCategory} singleCat = {categoryData} loading={loading}/> : null}
        </>
    )
}

export default CategoryEditForm;
