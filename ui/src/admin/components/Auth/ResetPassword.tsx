import React,{useState} from 'react';
import { Form, Button,Input } from 'antd';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone,UserOutlined, LockOutlined } from '@ant-design/icons';

const ResetPassword = (props:any) => {
    const [auth,setAuth] = useState({
        password:'',
        confirmPassword:''
      })
    const [error,seterror] = useState({
        password:'',
        confirmPassword:'',
        IsValid:true
    })
    const onDataChange = (e:any,name:string) => {
        let oldData : any = { ...auth }
        oldData[name] = e.target.value;
        setAuth(oldData);
    }
    const onFinish = async (values : any) => {
        let loginData = {...auth}
        let errors = { ...error, IsValid : false };
        
        if(!loginData.password || loginData.password === "")
        {
            errors.password = "New Password Is Required"
        } else {
          errors.IsValid = true;
          errors.password = ""
        } 
        if(!loginData.confirmPassword || loginData.confirmPassword === "")
        {
            errors.confirmPassword = "Confirm Password Is Required"
        }
        else {
          errors.IsValid = true;
          errors.confirmPassword = ""
        } 
        if(loginData.password.length > 0 && loginData.confirmPassword.length > 0)
        {
          if(loginData.password !== loginData.confirmPassword)
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
          await props.resetPass(loginData.password)     
        }
    };
    return ( <> <div>
        <title>Prasang Admin Forgot Password</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="limiter">
            <div className="container-login100">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-30" style={{height: '627px !important'}}>
                <Form className="login100-form validate-form">
                <span className="login100-form-title p-b-49">
                    Forgot Password
                </span>
                  <div className="m-b-23">
                    <span className="label-input100">Password</span>
                    {/* <input className="input100" type="password" name="password" placeholder="Type your password" onChange={(e) => onDataChange(e,'password')}/> */}
                    <Form.Item
                        // label="New Password"
                        name="password"
                        hasFeedback
                        validateStatus={(error.password)?"error":""}
                        help={error.password}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            size="large"
                            name="password"
                            placeholder=" Enter your password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => onDataChange(e,'password')}
                        />
                    </Form.Item>
                        <span className="focus-input100" data-symbol="" />
                    </div>
                    <div className="m-b-23">
                    <span className="label-input100">Confirm Password</span>
                    {/* <input className="input100" type="password" name="password" placeholder="Type your password" onChange={(e) => onDataChange(e,'password')}/> */}
                    <Form.Item
                        // label="Confirm Password"
                        name="confirmPassword"
                        hasFeedback
                        validateStatus={(error.confirmPassword)?"error":""}
                        help={error.confirmPassword}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            size="large"
                            name="confirmPassword"
                            // bordered={false}
                            placeholder=" Enter your password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={(e) => onDataChange(e,'confirmPassword')}
                        />
                    </Form.Item>
                        <span className="focus-input100" data-symbol="" />
                    </div>
                    <div>
                        <span>{(props.errormsg)?<h4 style={{color:'red'}}>Wrong Username Or Password</h4>:null}</span>
                    </div>
                    <div className="text-right p-t-8 p-b-31">
                    </div>
                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                        <div className="login100-form-bgbtn" />
                        <Button style={{background: "-webkit-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff)"}} className="login100-form-btn" onClick={onFinish}>
                            forgot password
                        </Button>
                        </div> 
                    </div>
                <div className="txt1 text-center p-t-54 p-b-20">
                    <span>
                    <Link to={"/prasangadmin/login"}>
                        Click here for Sign In
                    </Link>
                    </span>
                </div>
                </Form>
            </div>
            </div>
        </div>
        {/* <div id="dropDownSelect1" /> */}
        </div> </>)
}

export default ResetPassword;