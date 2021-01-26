import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import moment from "moment";
const EventList = (props: any) => {
    const [visible, setVisible] = useState({ show: false, id: null });

    const hideModal = () => {
        const stateModel = { ...visible };
        stateModel.show = false;
        setVisible(stateModel);
    };

    const hideOkModal = async () => {
        const stateModel = { ...visible };
        stateModel.show = false;
        setVisible(stateModel);
        await props.eventDelete(stateModel.id);
    };

    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: (a: any, b: any) => a.title.length - b.title.length,
        },
        {
            title: "StartDate",
            dataIndex: "startDate",
            key: "startDate",
            sorter: (a: any, b: any) => a.startDate.length - b.startDate.length,
        },
        {
            title: "EndDate",
            dataIndex: "endDate",
            key: "endDate",
            sorter: (a: any, b: any) => a.endDate.length - b.endDate.length,
        },
        {
            title: "LastRegistraionDate",
            dataIndex: "lastRegistraionDate",
            key: "lastRegistraionDate",
            sorter: (a: any, b: any) =>
                a.lastRegistraionDate.length - b.lastRegistraionDate.length,
        },
        {
            title: "Prize",
            dataIndex: "priceAmount",
            key: "priceAmount",
            sorter: (a: any, b: any) => a.priceAmount - b.priceAmount,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            sorter: (a: any, b: any) =>
                a.description.length - b.description.length,
        },
        {
            title: "Fees",
            dataIndex: "fees",
            key: "fees",
            sorter: (a: any, b: any) => a.fees - b.fees,
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
        },
    ];
    const deleteModal = (id: any) => {
        setVisible({ show: true, id: id });
    };
    const updateHandler = async (id: any) => {
        await props.singleEvent(id);
    };
    const data: any = (list: any, eventDelete: any) => {
        let eventArr: any = [];
        for (let i = 0; i < list.length; i++) {
            eventArr.push({
                key: i + 1,
                index: i + 1,
                title: list[i].title,
                startDate: moment(+list[i].startDate).format("D/MM/yyyy"),
                endDate: moment(+list[i].endDate).format("D/MM/yyyy"),
                lastRegistraionDate: moment(
                    +list[i].lastRegistraionDate
                ).format("D/MM/yyyy"),
                priceAmount: list[i].priceAmount,
                description: list[i].description,
                fees: list[i].fees,
                image: <img src={list[i].imageUrl} width="50px" />,
                edit: (
                    <Button
                        type="primary"
                        onClick={() => updateHandler(list[i].eventId)}
                    >
                        Edit
                    </Button>
                ),
                delete: (
                    <Button
                        type="primary"
                        onClick={() => eventDelete(list[i].eventId)}
                        danger
                    >
                        Delete
                    </Button>
                ),
            });
        }
        return eventArr;
    };
    return (
        <>
            <Table
                columns={columns}
                pagination={{ pageSize: 4 }}
                dataSource={data(props.list, deleteModal)}
            />
            <Modal
                title="Modal"
                visible={visible.show}
                onOk={hideOkModal}
                onCancel={hideModal}
                okText="Delete"
                cancelText="Cancle"
            >
                <p>Are You Sure You Want To Delete ...</p>
            </Modal>
        </>
    );
};

export default EventList;
