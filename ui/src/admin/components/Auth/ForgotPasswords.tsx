import React,{useState} from 'react';
import { Form, Button,Input } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const ForgotPasswords = (props:any) => {
    const [auth,setAuth] = useState({
        email:''
      })
    const onDataChange = (e:any,name:string) => {
        let oldData : any = { ...auth }
        oldData[name] = e.target.value;
        setAuth(oldData);
    }
    const onFinish = async (values : any) => {
        let loginData = {...auth}
        
        await props.forgotpass(loginData.email)     
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
                    <span className="label-input100">Email ID</span>
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} size="large"
                     placeholder=" Enter Email ID" onChange={(e) => onDataChange(e,'email')} />
                    <span className="focus-input100" data-symbol="" />
                </div>
                <div>
                    <span>{(props.errormsg.length>0)?<h4 style={{color:'red'}}>Wrong email Or Password</h4>:null}</span>
                    <span>{(props.msg)?<h4 style={{color:'green'}}>Email Sent Successfully</h4>:null}</span>
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

export default ForgotPasswords;