import React , {useEffect,useState,useRef} from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { useDispatch,useSelector } from 'react-redux'

import CategoryList from '../components/Category/CategoryList';
import {IRootState} from '../store/store';
import { Spin, Alert, Card,Empty } from 'antd';
import * as types from '../store/actionTypes'
import { FetchCategory,DELETE_Category } from '../store/actions/actionMethod';

const Category = (props:any) =>{
    const { data, refetch,loading } = useQuery(FetchCategory);
    const categoryList = useSelector((state:IRootState) => state.category.categoryList)
    const unmounted = useRef(false);
    useEffect(()=>{
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
        return () => { unmounted.current = true }
    },[data])
    let loadder : any =<Empty/>;
    if(loading)
    {
        loadder = <Spin tip="Loading..."></Spin>
    }

    const [delCat] = useMutation(DELETE_Category);
    
    const dispatch = useDispatch();
    const[ids,setIds] = useState("");
    const deleteCategory = async (id:string) => {
        setIds(id);
        dispatch({
            type:types.INIT_DELETE_CATEGORY
        })
        try {
            const response = await delCat({variables:{categoryId:id}});
            dispatch({
                type:types.DELETE_DATA_SUCCESS,
                categoryList:response.data,
                categoryId:id
            })  
        } catch (error) {
            dispatch({
                type:types.DELETE_DATA_FAILED,
                error:error.message
            })
        }
    }
    const singleCategory = async (id:string) => {
        props.history.push("/editcategory/"+id);
    }

    const catLength = categoryList; 
    
    if(catLength!=undefined && !loading && catLength.length > 0)
    {
        loadder = <CategoryList list = {categoryList} Catdelete = {deleteCategory} singleCat = { singleCategory }/>;
    }
    return(
        <>
        <div className="site-card-border-less-wrapper">
            <Card title="Category" bordered={false}>
                {loadder}
            </Card>
        </div>
        </>
    )
}

export default Category;