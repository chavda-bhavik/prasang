import React,{useEffect, useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const ChangePasswords = (props:any) => {  
  const [password,setPassword] = useState({
      password:'',
      oldPassword:'',
      confirmPassword:''
  })
  const [error,seterror] = useState({
      password:'',
      oldPassword:'',
      confirmPassword:'',
      IsValid:true
  })
  useEffect(()=> {
    console.log(props.err);
    if(props.err)
    {
      seterror({
        ...error,
        oldPassword:"Old Password Not Matched",
        IsValid:false
      })  
    }
  },[props.err])

  const onDataChange = (e:any,name:string) => {
    
        let oldData : any = { ...password }
        oldData[name] = e.target.value;
        setPassword(oldData);
    }
    const onFinish = async (values:any) => {
        let passwords = { ...password }
        let errors = { ...error, IsValid : false };
        if(!passwords.oldPassword || passwords.oldPassword === "")
        {
            errors.oldPassword = "Old Password Is Required"
        } else {
            errors.IsValid = true;
            errors.oldPassword = ""
        } 

        if(!password.password || passwords.password === "")
        {
            errors.password = "New Password Is Required"
        } else {
          errors.IsValid = true;
          errors.password = ""
        } 
        if(!password.confirmPassword || passwords.confirmPassword === "")
        {
            errors.confirmPassword = "Confirm Password Is Required"
        }
        else {
          errors.IsValid = true;
          errors.confirmPassword = ""
        } 
        if(password.password.length > 0 && password.confirmPassword.length > 0)
        {
          console.log(password.password +" <=> "+ password.confirmPassword)
          if(password.password !== password.confirmPassword)
          {
              errors.IsValid = false;
              errors.confirmPassword = "New Password and Confirm Password Not Matched"
          }
          else
          {
              errors.IsValid = true;
              errors.confirmPassword = "";
          }
        }
        seterror(errors);
        if(errors.IsValid)
        {
          await props.changePassword(passwords.oldPassword,passwords.password);     
        }
        console.log('Success:', values);
        
      };
    
      const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
      };

    return ( <> 
        <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Old Password"
        name="old"
        hasFeedback
        validateStatus={(error.oldPassword)?"error":""}
        help={error.oldPassword}
      >
        <Input.Password name="oldPassword" onChange={(e) => onDataChange(e,'oldPassword')}/>
      </Form.Item>

      <Form.Item
        label="New Password"
        name="password"
        hasFeedback
        validateStatus={(error.password)?"error":""}
        help={error.password}
      >
        <Input.Password name="password" onChange={(e) => onDataChange(e,'password')}/>
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="cnfpassword"
        hasFeedback
        validateStatus={(error.confirmPassword)?"error":""}
        help={error.confirmPassword}
      >
        <Input.Password name="confirmPassword" onChange={(e) => onDataChange(e,'confirmPassword')}/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onFinish}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>)
}

export default  ChangePasswords;