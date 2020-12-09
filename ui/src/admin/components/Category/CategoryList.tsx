import React,{useState} from 'react';
import { Table, Button,Modal } from 'antd';

const CategoryList = (props:any) =>{
    const[visible,setVisible] = useState({ show: false, id: null });
    
      const hideModal = () => {
        const stateModel = {...visible};
        stateModel.show = false;
        setVisible(stateModel);
      };

      const hideOkModal = async () => {
        const stateModel = {...visible};
        stateModel.show = false;
        setVisible(stateModel);
        await props.Catdelete(stateModel.id)
      }

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image'
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit'
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete'
        }
    ];
    const deleteModal = (id:any) => {
        console.log(id);
        setVisible({ show: true, id: id });
    }
    const data : any = (list:any,Catdelete:any) => {
        let categoryArr : any = [];
        for(let i = 0;i<list.length;i++)
        {
            categoryArr.push({
                key:i+1,
                index:i+1,
                name:list[i].name,
                image:<img src={list[i].imagePath} width="50px"/>,
                edit:<Button type="primary">Edit</Button>,
                delete:<Button type="primary" onClick={() => Catdelete(list[i].categoryId)} danger>Delete</Button>
            });            
        }
        return categoryArr;
    } 
    return(
        <>
            <Table columns={columns} dataSource={data(props.list,deleteModal)}/>
            <Modal
                title="Modal"
                visible={visible.show}
                onOk={hideOkModal}
                onCancel={hideModal}
                okText="Delete"
                cancelText="Cancle"
                >
                <p>Are You Sure You Want To Delete ...</p>
            </Modal> 
        </>
    )
}

export default CategoryList;