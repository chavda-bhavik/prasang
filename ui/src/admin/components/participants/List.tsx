import { Table, Image } from 'antd'
import React from 'react'
import classes from './List.module.css'
const moment = require('moment');

interface Participant {
    participationDate: number,
    participationId: string,
    photoAdded: boolean,
    user: {
        name: string
    }
    photo?: {
        imageUrl: string
    }
}
interface ListProps {
    participants: Participant[]
}
interface user {
    name: string
}
interface photo {
    imageUrl?: string
}

const List = (props: ListProps) => {
    const { Column } = Table;
    return (
        <div>
            <Table key="tbl" pagination={{ position: ["bottomCenter"], defaultPageSize: 5, pageSizeOptions: ['10', '20', '30'], hideOnSinglePage: true }} dataSource={props.participants} className={classes.table} >
                <Column
                    title="#"
                    key="index"
                    render={ (value, item, index) => index+1 }
                />
                <Column
                    title="Name"
                    key="name"
                    dataIndex="user"
                    render={ (value:user) => value.name }
                />
                <Column
                    title="Participation Date"
                    key="participationdate"
                    dataIndex="participationDate"
                    render={ (value) =>  moment(+value).format("D/MM/yyyy") }
                    sorter={ (a:Participant, b:Participant) => {
                            return a.participationDate-b.participationDate;
                        }
                    }
                />
                <Column
                    title="Photo Added"
                    key="photoadded"
                    dataIndex="photoAdded"
                    render={ (value:boolean) => value ? "Yes" : "No" }
                    sorter={ (a:Participant, b:Participant) => {
                        return +a.photoAdded-(+b.photoAdded)
                    }
                }
                />
                <Column
                    title="Photo"
                    key="viewphoto"
                    dataIndex="photo"
                    render={ (value:photo | null) => {
                        if(value)
                            return <Image width={55} src={value.imageUrl} />
                        else
                            return <></>
                    } }
                />
            </Table>
        </div>
    )
}

export default List;