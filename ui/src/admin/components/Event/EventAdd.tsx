import React, { useState } from "react";
import moment from "moment";
import { Row, Col, DatePicker, Form, Input, Button, Select, Card } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;
const EventAdd = (props: any) => {
    const [event, setEvent] = useState({
        image: "",
        title: "",
        categoryId: "",
        startDate: "",
        endDate: "",
        lastRegistraionDate: "",
        description: "",
        prize: "",
        fees: 10,
    });
    const [error, setError] = useState({
        imageError: "",
        titleError: "",
        categoryIdError: "",
        startDateError: "",
        endDateError: "",
        lastRegistraionDateError: "",
        descriptionError: "",
        feesError: "",
        prizeError: "",
        IsValid: false,
    });
    const range = (start: any, end: any) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };
    const disabledDate = (current: any) => {
        return current && current <= moment().endOf("day");
    };

    const disabledRangeTime = (_: any, type: any) => {
        if (type === "start") {
            return {
                disabledHours: () => range(0, 60).splice(4, 20),
                disabledMinutes: () => range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => range(0, 60).splice(20, 4),
            disabledMinutes: () => range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    };
    const onFinish = async (values: any) => {
        let eventData = { ...event };
        let errors = { ...error, IsValid: true };
        if (!event.title || event.title === "") {
            errors.IsValid = false;
            errors.titleError = "Event Title Is Required ";
        } else errors.titleError = "";
        if (!event.prize || event.prize === "") {
            errors.IsValid = false;
            errors.prizeError = "Event prize Is Required ";
        } else errors.prizeError = "";
        if (!event.image) {
            errors.IsValid = false;
            errors.imageError = "Event Image Is Required ";
        } else errors.imageError = "";
        if (!event.categoryId) {
            errors.IsValid = false;
            errors.categoryIdError = "Event Category Is Required ";
        } else errors.categoryIdError = "";
        if (!event.startDate) {
            errors.IsValid = false;
            errors.startDateError = "Event StartDate Is Required ";
        } else errors.startDateError = "";
        if (!event.endDate) {
            errors.IsValid = false;
            errors.endDateError = "Event EndDate Is Required ";
        } else errors.endDateError = "";
        if (!event.lastRegistraionDate) {
            errors.IsValid = false;
            errors.lastRegistraionDateError =
                "Last RegistraionDate Is Required ";
        } else errors.lastRegistraionDateError = "";
        // if(event.lastRegistraionDate && event.endDate)
        // {
        //     if(event.endDate <= event.lastRegistraionDate)
        //     {
        //         errors.IsValid = false;
        //         errors.lastRegistraionDateError = " Last RegistraionDate Should Less Than End Date"
        //     }
        //     else {
        //         errors.lastRegistraionDateError = ""
        //     }
        // }
        if (!event.fees) {
            errors.IsValid = false;
            errors.feesError = " fees Is Required ";
        } else errors.feesError = "";
        if (!event.description) {
            errors.IsValid = false;
            errors.descriptionError = " Description Is Required ";
        } else errors.descriptionError = "";

        if (errors.IsValid) {
            await props.insertEvent(
                eventData.title,
                eventData.prize,
                eventData.categoryId,
                eventData.startDate,
                eventData.endDate,
                eventData.lastRegistraionDate,
                eventData.description,
                eventData.fees,
                eventData.image
            );
        }
        setError(errors);
    };

    const onFinishFailed = (errorInfo: any) => {
        // console.log('Failed:', errorInfo);
    };

    const onDataChange = (e: any, name: string, image: string) => {
        let oldData: any = { ...event };
        let errors = { ...error, IsValid: true };

        if (image != "") {
            const imageFile = e.target.files[0];
            if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
                errors.imageError = "image Should be jpg,jpeg or png";
                errors.IsValid = false;
            } else {
                errors.imageError = "";
                oldData[image] = imageFile;
            }
            setError(errors);
        } else if (name == "startDate" || name == "lastRegistraionDate") {
            if (name == "startDate") {
                if (e != null) {
                    oldData["startDate"] = moment(e[0]._d).format("DD-MM-YYYY");
                    oldData["endDate"] = moment(e[1]._d).format("DD-MM-YYYY");
                } else {
                    oldData["startDate"] = "";
                    oldData["endDate"] = "";
                }
            } else {
                if (e != null) {
                    oldData["lastRegistraionDate"] = moment(e._d).format(
                        "DD-MM-YYYY"
                    );
                } else {
                    oldData["lastRegistraionDate"] = "";
                }
            }
        } else if (name == "categoryId") {
            oldData["categoryId"] = e;
        } else {
            oldData[name] = e.target.value;
        }
        console.log(oldData);
        setEvent(oldData);
    };
    const fetchCategory = (cat: any) => {
        let categoryArr: any = [];
        for (let i = 0; i < cat.length; i++) {
            categoryArr.push(
                <Option key={cat[i].categoryId} value={cat[i].categoryId}>
                    {cat[i].name}
                </Option>
            );
        }
        return categoryArr;
    };
    const nameAttr = { name: "categoryId" };
    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card title="Event Form" bordered={false}>
                    <Form
                        name="basic"
                        onFinishFailed={onFinishFailed}
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Form.Item
                            label="Title"
                            hasFeedback
                            validateStatus={error.titleError ? "error" : ""}
                            help={error.titleError}
                        >
                            <Input
                                name="title"
                                onChange={(e) => onDataChange(e, "title", "")}
                            />
                        </Form.Item>
                        <Form.Item
                            name="categoryId"
                            label="Category"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Please select your category!",
                                },
                            ]}
                        >
                            <Select
                                {...nameAttr}
                                placeholder="Please select a category"
                                onChange={(e) =>
                                    onDataChange(e, "categoryId", "")
                                }
                            >
                                {props.category
                                    ? fetchCategory(props.category)
                                    : null}
                            </Select>
                        </Form.Item>
                        {/* <Form.Item label="Category Name"
                        hasFeedback
                        validateStatus={(error.categoryIdError)?"error":""}
                        help={error.categoryIdError}
                      >
                        <Input name="categoryId" onChange={(e) => onDataChange(e,'categoryId','')}/>
                    </Form.Item> */}
                        {/* <Form.Item label="Start Date"
                        hasFeedback
                        validateStatus={(error.startDateError)?"error":""}
                        help={error.startDateError}
                      >
                        <Input name="startDate" onChange={(e) => onDataChange(e,'startDate','')}/>
                    </Form.Item>
                    <Form.Item label="End Date"
                        hasFeedback
                        validateStatus={(error.endDateError)?"error":""}
                        help={error.endDateError}
                      >
                        <Input name="endDate" onChange={(e) => onDataChange(e,'endDate','')}/>
                    </Form.Item> */}
                        <Form.Item
                            label="Start & End Date"
                            hasFeedback
                            validateStatus={error.endDateError ? "error" : ""}
                            help={error.endDateError}
                        >
                            <RangePicker
                                disabledDate={disabledDate}
                                disabledTime={disabledRangeTime}
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [
                                        moment("00:00:00", "HH:mm:ss"),
                                        moment("11:59:59", "HH:mm:ss"),
                                    ],
                                }}
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={(e) =>
                                    onDataChange(e, "startDate", "")
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Last Registration"
                            hasFeedback
                            validateStatus={
                                error.lastRegistraionDateError ? "error" : ""
                            }
                            help={error.lastRegistraionDateError}
                        >
                            <DatePicker
                                name="lastRegistraionDate"
                                onChange={(e) =>
                                    onDataChange(e, "lastRegistraionDate", "")
                                }
                            />
                            {/* <Input name="lastRegistraionDate" onChange={(e) => onDataChange(e,'lastRegistraionDate','')}/> */}
                        </Form.Item>
                        <Form.Item
                            label="Prize"
                            hasFeedback
                            validateStatus={error.prizeError ? "error" : ""}
                            help={error.prizeError}
                        >
                            <Input
                                name="prize"
                                placeholder={"Enter Prize"}
                                value={event.prize}
                                onChange={(e) => onDataChange(e, "prize", "")}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Fees"
                            hasFeedback
                            validateStatus={error.feesError ? "error" : ""}
                            help={error.feesError}
                        >
                            <Input
                                name="fees"
                                placeholder={"10"}
                                value={event.fees}
                                onChange={(e) => onDataChange(e, "fees", "")}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            hasFeedback
                            validateStatus={
                                error.descriptionError ? "error" : ""
                            }
                            help={error.descriptionError}
                        >
                            <Input
                                name="description"
                                onChange={(e) =>
                                    onDataChange(e, "description", "")
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Event Image"
                            extra="Please Image in jpg/png/jpeg with max size 1 MB"
                            hasFeedback
                            validateStatus={error.imageError ? "error" : ""}
                            help={error.imageError}
                        >
                            <Input
                                type="file"
                                name="image"
                                onChange={(e) =>
                                    onDataChange(e, "image", "image")
                                }
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={onFinish}
                                loading={props.loading}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

export default EventAdd;
