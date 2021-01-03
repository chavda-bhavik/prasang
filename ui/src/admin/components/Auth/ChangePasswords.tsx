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
    if(props.errs.length>0)
    {
      if(props.errs == 'Old Password is Not Match')
      {
        seterror({
          ...error,
          oldPassword:"Old Password is Not Match",
          IsValid:false
        })  
      }
      if(props.errs == 'Password Must be 8')
      {
        seterror({
          ...error,
          confirmPassword:"Password Must be 8",
          IsValid:false
        })
      }
    }
    // if(error.IsValid)
    // {
    //   seterror({
    //     confirmPassword:"",
    //     oldPassword:"",
    //     password:"",
    //     IsValid:true
    //   })
    // }
  },[props.pass,props.errs,error.IsValid])

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
            // if(passwords.password.length < 8)
            // {
            //   errors.password = " Password Length Should be More Than 8"
            // }
            // else
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
        console.log(errors);
        if(errors.IsValid)
        {
          await props.changePassword(passwords.oldPassword,passwords.password);     
        }
        
      };
    
      const onFinishFailed = (errorInfo:any) => {
        // console.log('Failed:', errorInfo);
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
        <Input.Password name="oldPassword" value={password.oldPassword} onChange={(e) => onDataChange(e,'oldPassword')}/>
      </Form.Item>

      <Form.Item
        label="New Password"
        name="password"
        hasFeedback
        validateStatus={(error.password)?"error":""}
        help={error.password}
      >
        <Input.Password name="password" value={password.password} onChange={(e) => onDataChange(e,'password')}/>
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="cnfpassword"
        hasFeedback
        validateStatus={(error.confirmPassword)?"error":""}
        help={error.confirmPassword}
      >
        <Input.Password name="confirmPassword" value={password.confirmPassword} onChange={(e) => onDataChange(e,'confirmPassword')}/>
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