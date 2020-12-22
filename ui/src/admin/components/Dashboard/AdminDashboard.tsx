import React, { useState,useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import Party from '../../../images/party.png';
import {
    UserOutlined,
    DingdingOutlined,
    SlackOutlined,
    GitlabOutlined
  } from '@ant-design/icons';

const AdminDashboard = (props:any) => {
    const [dash,setDash] = useState({
        ongoingEvent:"",
        commingEvent:"",
        pastEvent:"",
        currentUser:""
    })
    useEffect(()=> {
        if(props.dash[0])
        {
            setDash({
                ongoingEvent:props.dash[0].ongoingEvent,
                commingEvent:props.dash[0].commingEvent,
                pastEvent:props.dash[0].pastEvent,
                currentUser:props.dash[0].currentUser
            })
        }
    },[props.dash])
    return ( <> 
        <div className="site-card-wrapper">
            <Row gutter={16}>
            <Col span={6}>
                <Card bordered={false} style={{color:'white',background:'#17a2b8'}}>
                    <div>
                        <h3 style={{fontSize: '2.2rem',color:'white'}}>{dash.ongoingEvent}</h3>
                        <p style={{fontSize: '1rem',color:'white'}}>{"Ongoing Event"}</p>
                    </div>
                    <div className="icon" style={{fontSize: "70px" , top: "20px",position: "absolute",right: "15px",transition: "transform .3s linear !important"}}>
                        {/* <img className="logo" height="60px" width="80ox" src={Party}/> */}
                        <GitlabOutlined />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false} style={{color:'white',background:'#28a745'}}>
                    <div>
                        <h3 style={{fontSize: '2.2rem',color:'white'}}>{dash.commingEvent}</h3>
                        <p style={{fontSize: '1rem',color:'white'}}>{"Comming Event"}</p>
                    </div>
                    <div className="icon" style={{fontSize: "70px" , top: "20px",position: "absolute",right: "15px",transition: "transform .3s linear !important"}}>
                        <DingdingOutlined />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false} style={{color:'white',background:'#ffc107'}}>
                    <div>
                        <h3 style={{fontSize: '2.2rem',color:'white'}}>{dash.pastEvent}</h3>
                        <p style={{fontSize: '1rem',color:'white'}}>{"Past Event"}</p>
                    </div>
                    <div className="icon" style={{fontSize: "70px" , top: "20px",position: "absolute",right: "15px",transition: "transform .3s linear !important"}}>
                        <SlackOutlined />
                    </div>
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false} style={{color:'white',background:'#dc3545'}}>
                    <div>
                        <h3 style={{fontSize: '2.2rem',color:'white'}}>{dash.currentUser}</h3>
                        <p style={{fontSize: '1rem',color:'white'}}>{"User"}</p>
                    </div>
                    <div className="icon" style={{fontSize: "70px" , top: "20px",position: "absolute",right: "15px",transition: "transform .3s linear !important"}}>
                        <UserOutlined />
                    </div>
                </Card>
            </Col>
            </Row>
        </div>
    </>)
}

export default  AdminDashboard;