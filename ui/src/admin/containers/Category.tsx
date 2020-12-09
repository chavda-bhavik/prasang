import React , {useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import CategoryList from '../components/Category/CategoryList';
import {FetchCategory} from '../store/actions/categoryAction';
import {IRootState} from '../store/store';
import { Card } from 'antd';
import * as types from '../store/actionTypes'

const DELETE_Category = gql`
  mutation deleteEventCategory($categoryId: ID!){
    deleteEventCategory(categoryId: $categoryId){
        categoryId
        name
        imagePath
    }
  }  
`;

const Category = (props:any) =>{
    useEffect(()=>{
        props.FetchCategory()
    },[props.FetchCategory])

    let loadder : any = "Loading ....";

    const [delCat] = useMutation(DELETE_Category);
    const dispatch = useDispatch();
    
    const deleteCategory = async (id:string) => {
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
            console.log(error.message);
            dispatch({
                type:types.DELETE_DATA_FAILED,
                error:error.message
            })
        }
    }
  

    const catLength = props.list; 
    
    if(catLength!=undefined && catLength.length > 0)
    {
        loadder = <CategoryList list = {props.list} Catdelete = {deleteCategory}/>;
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

const mapStateToProps = (state:IRootState) : any => ({
    list: state.category.categoryList
});

const mapDispatchToProps = (dispatch:any) => {
    return {
        FetchCategory: () => dispatch(FetchCategory())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Category);