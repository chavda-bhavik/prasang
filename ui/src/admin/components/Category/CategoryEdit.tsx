import React, { useEffect, useState } from 'react';
import { Form, Input, Button,Card ,Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const CategoryEdit = (props:any) => {
    const [category,setCategory] = useState({
        cat_name:'',
        image:'',
        dimage:'',
        id:''
    })
    const [error,seterror] = useState({
        nameError:'',
        imageError:'',
        IsValid:false
    })
    useEffect(()=>{
        if(props.singleCat.eventCategory)
        {
            let categoryData = {...category}
            categoryData.cat_name = props.singleCat.eventCategory.name;
            categoryData.id = props.singleCat.eventCategory.categoryId;
            categoryData.dimage = props.singleCat.eventCategory.imagePath;
            categoryData.image = props.singleCat.eventCategory.imagePath;
            setCategory(categoryData);
        }
    },[props.singleCat.eventCategory])
    const onFinish = async (values : any) => {
        let categoryData = {...category}
        let errors = { ...error, IsValid : true };
        if(!category.cat_name || category.cat_name === "")
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
            await props.updateCategory(categoryData.id,categoryData.cat_name,categoryData.image)
            categoryData.cat_name=""
            categoryData.id=""
            categoryData.image=""
            setCategory(categoryData); 
        }
        seterror(errors);

    };

    const normFile = (e : any) => {
      
        if (Array.isArray(e)) {
          return e;
        }
    
        return e && e.fileList;
      };
    
    const onFinishFailed = (errorInfo : any) => {
        // console.log('Failed:', errorInfo);
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
                        <Input value={category.cat_name} name="cat_name" type="text"  onChange={(e) => onDataChange(e,'cat_name','')}/>
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Category Image"
                        hasFeedback
                        validateStatus={(error.imageError)?"error":""}
                        help={error.imageError}
                        getValueFromEvent={normFile}
                        extra="Please Image in jpg/png/jpeg with max size 1 MB"
                    >
                        <Input type="file" name="image" onChange={(e) => onDataChange(e,'image','image')} />
                        <img src={category.dimage} width="50px"/>
                    </Form.Item>


                    <Form.Item >
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

export default CategoryEdit;
