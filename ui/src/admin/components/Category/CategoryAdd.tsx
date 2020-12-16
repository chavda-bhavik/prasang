import React, { useState } from 'react';
import { Form, Input, Button,Card } from 'antd';

const CategoryAdd = (props:any) => {
    const [category,setCategory] = useState({
        name:'',
        image:''
    })
    const [error,seterror] = useState({
        nameError:'',
        imageError:'',
        IsValid:false
    })

    const onFinish = async (values : any) => {
        let categoryData = {...category}
        let errors = { ...error, IsValid : true };
        if(!category.name || category.name === "")
        {
            errors.IsValid = false;
            errors.nameError = "Category Name Is Required "
        }
        else
            errors.nameError = ""
        if(!category.image)
        {
            errors.IsValid = false;
            errors.imageError = "Category Image Is Required "
        }
        else
            errors.imageError = ""
        if(errors.IsValid)
        {
            await props.addCategory(categoryData.name,categoryData.image)     
            console.log('Success:', values);
        }
        seterror(errors);
    };
    
    const onFinishFailed = (errorInfo : any) => {
        console.log('Failed:', errorInfo);
    };

    const onDataChange = (e:any,name:string,image:string) => {
        let oldData : any = { ...category }
        let errors = { ...error, IsValid : true };
        
        if(image!='') {
            const imageFile = e.target.files[0];
            if(!imageFile.name.match(/\.(jpg|jpeg|png)$/))
            {
                errors.imageError = 'image Should be jpg,jpeg or png';
                errors.IsValid = false;
            }
            else
            {
                errors.imageError = '';
                oldData[image] = imageFile;
            }
            seterror(errors);
        }
        else
        {
            oldData[name] = e.target.value;
        }
        setCategory(oldData);
    }
    return (
        <>
        <div className="site-card-border-less-wrapper">
            <Card title="Category Form" bordered={false} >
                <Form name="basic" onFinishFailed={onFinishFailed} labelCol={{ span: 3 }} wrapperCol={{ span: 14 }} >
                    <Form.Item label="Category Name"
                        hasFeedback
                        validateStatus={(error.nameError)?"error":""}
                        help={error.nameError}
                      >
                        <Input name="name" onChange={(e) => onDataChange(e,'name','')}/>
                    </Form.Item>

                    <Form.Item
                        label="Category Image" 
                        extra="Please Image in jpg/png/jpeg with max size 1 MB"
                        hasFeedback
                        validateStatus={(error.imageError)?"error":""}
                        help={error.imageError}>
                        <Input type="file" name="image" onChange={(e) => onDataChange(e,'image','image')} />
                    </Form.Item>
                    

                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={onFinish} loading={props.loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
            
        </>
    )
}

export default CategoryAdd;
