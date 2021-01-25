import React, { useState } from "react";
import { Button, Select } from "antd";
import classes from "./Sidebar.module.css";
import { useQuery } from "@apollo/client";
import { FETCH_EVENTS_QUERY } from "../../../GqlQueries";

interface fetchPhotosArgs {
    eventId?: string;
    likesPlus?: number;
    commentsPlus?: number;
    limit?: number;
    offset?: number;
}

interface SidebarProps {
    submitWinner: () => void;
    setWinnerLoading: boolean;
    search: (data: fetchPhotosArgs) => void;
}

const Sidebar = (props: SidebarProps) => {
    const { Option } = Select;
    const [eventId, setEventId] = useState<string>();
    const [commentsPlus, setCommentsPlus] = useState<number>(0);
    const [likesPlus, setLikesPlus] = useState<number>();
    const { data: eventsData, loading: eventsLoading } = useQuery(
        FETCH_EVENTS_QUERY
    );
    const searchHandler = () => {
        props.search({ eventId, likesPlus, commentsPlus });
    };
    const onEventChange = (eventId: string) => {
        setEventId(eventId);
    };
    return (
        <div className={classes.section}>
            <h4>
                <b>Event</b>
            </h4>
            <Select
                showSearch
                defaultValue=""
                style={{ width: "100%" }}
                placeholder="Select an Event"
                optionFilterProp="children"
                onChange={onEventChange}
                filterOption={(input, option) => {
                    return (
                        option?.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    );
                }}
            >
                <Select.Option value="">All</Select.Option>
                {!eventsLoading &&
                    eventsData.events.map((event: any, index: number) => (
                        <Select.Option key={index} value={event.eventId}>
                            {event.title}
                        </Select.Option>
                    ))}
            </Select>
            <h4>
                <b>Likes</b>
            </h4>
            <Select
                showSearch
                defaultValue={0}
                style={{ width: "100%" }}
                placeholder="Likes"
                value={likesPlus}
                optionFilterProp="children"
                onChange={(val) => setLikesPlus(val)}
            >
                <Option value={0}>0+</Option>
                <Option value={1}>1+</Option>
                <Option value={5}>5+</Option>
                <Option value={10}>10+</Option>
            </Select>
            <h4>
                <b>Comments</b>
            </h4>
            <Select
                showSearch
                style={{ width: "100%" }}
                defaultValue={0}
                placeholder="Comments"
                optionFilterProp="children"
                value={commentsPlus}
                onChange={(val) => setCommentsPlus(val)}
            >
                <Option value={0}>0+</Option>
                <Option value={1}>1+</Option>
                <Option value={5}>5+</Option>
                <Option value={10}>10+</Option>
            </Select>
            <br />
            <Button
                // loading={props.setWinnerLoading}
                style={{ marginTop: "4px" }}
                type="default"
                onClick={searchHandler}
            >
                Search
            </Button>

            <Button
                loading={props.setWinnerLoading}
                style={{ marginTop: "4px" }}
                type="primary"
                // onClick={props.submitWinner}
            >
                Decide Winner
            </Button>
        </div>
    );
};

export default Sidebar;
