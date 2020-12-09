import React, { useState } from 'react';
import { Form, Input, Button,Card ,Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const CategoryAdd = (props:any) => {
    const [category,setCategory] = useState({
        name:'',
        image:''
    })

    const onFinish = async (values : any) => {
        let categoryData = {...category}
        await props.addCategory(categoryData.name,categoryData.image)     
        console.log('Success:', values);
    };

    const normFile = (e : any) => {
      
        if (Array.isArray(e)) {
          return e;
        }
    
        return e && e.fileList;
      };
    
    const onFinishFailed = (errorInfo : any) => {
        console.log('Failed:', errorInfo);
    };

    const onDataChange = (e:any,name:string,image:string) => {
        let oldData : any = { ...category }
        
        if(image!='') {
            const imageFile = e.target.files[0];
            oldData[image] = imageFile;
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
                    <Form.Item label="Category Name" name="name" 
                        rules={[
                        {
                            required: true,
                            message: 'Please input your Category!',
                        },
                        ]}
                    >
                        <Input onChange={(e) => onDataChange(e,'name','')}/>
                    </Form.Item>
                    
                   
                    <Form.Item
                        name="image"
                        label="Category Image"
                        // valuePropName="fileList"
                        // rules = {[
                        //     {
                        //         required: true,
                        //         message: 'Please Select Image',
                        //     }
                        // ]}
                        getValueFromEvent={normFile}
                        extra="Please Image in jpg/png/jpeg with max size 1 MB"
                    >
                        {/* <Upload name="logo" listType="picture">
                            <Button onChange={(e) => onDataChange(e,'image','image')} icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload> */}
                        <Input type="file" name="image" onChange={(e) => onDataChange(e,'image','image')} />
                    </Form.Item>


                    <Form.Item >
                        <Button type="primary" htmlType="submit" onClick={onFinish}>
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
