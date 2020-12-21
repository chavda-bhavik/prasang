import { Table } from 'antd'
import React from 'react'
import classes from './List.module.css'

interface ListProps {
    participants: {
        participationDate: string,
        participationId: string,
        photoAdded: boolean,
        user: {
            name: string
        }
    }[]
}
interface user {
    name: string
}

const List = (props: ListProps) => {
    const { Column } = Table;
    // const body = CSS({
    //     backgroundColor: 'green',
    //     '& thead > tr > th': {
    //       backgroundColor: 'blue'
    //     }
    // })
    return (
        <div>
            <Table pagination={{ position: ["bottomCenter"], defaultPageSize: 5, pageSizeOptions: ['10', '20', '30'], hideOnSinglePage: true }} dataSource={props.participants} className={classes.table} >
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
                    render={ (value) => value }
                />
                <Column
                    title="Photo Added"
                    key="photoadded"
                    dataIndex="photoAdded"
                    render={ (value:boolean) => value ? "Yes" : "No" }
                />
                <Column
                    title="View Photo"
                    key="viewphoto"
                    render={ (value, item, index) => index }
                />
            </Table>
        </div>
    )
}

export default List;