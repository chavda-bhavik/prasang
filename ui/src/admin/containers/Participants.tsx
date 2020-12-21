import React, { useState } from "react";
import { Select, Spin, Typography } from 'antd';
import ParticipantsList from '../components/participants/List'
import gql from "graphql-tag";
import { useQuery } from '@apollo/client'


const FETCH_EVENTS_QUERY = gql`
    query {
        events {
            eventId
            title
        }
    }
`;
const FETCH_PARTICIPATIONS_QUERY = gql`
    query getParticipations($eventId: ID) {
        participations(eventId: $eventId) {
            participationId
            user {
                name
            }
            participationDate
            photoAdded
            photo {
                imageUrl
            }
        }
    }
`

interface ParticipantsProps {
}

const Participantes = (props:ParticipantsProps) => {
    const [eventId, setEventId] = useState("");
    const { data:eventsData, loading:eventsLoading } = useQuery(FETCH_EVENTS_QUERY);
    const { data:participationsData, refetch, loading:participationsLoading } = useQuery(FETCH_PARTICIPATIONS_QUERY, {
        variables: { eventId }
    });
    const { Text } = Typography;

    const onEventChange = (eventId:string) => {
        setEventId(eventId);
        refetch();
    }

    let heading = "No Participants found.";
    if(!participationsLoading && participationsData) {
        heading = participationsData.participations.length == 0 ? "No" : participationsData.participations.length;
        heading += " Participants found.";
    }
    let content = <Spin />
    if(!participationsLoading && participationsData) {
        content = <ParticipantsList participants={participationsData.participations} />
    }

    return (
        <div>
            <div style={{ backgroundColor: 'orange', padding: '5px', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                <Text strong>
                    { heading }
                </Text>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select an Event"
                    optionFilterProp="children"
                    onChange={onEventChange}
                    filterOption={(input, option) => {
                            return option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    }
                >
                    {
                        !eventsLoading && 
                        eventsData.events.map( (event:any, index:number) => <Select.Option key={index} value={event.eventId}>{event.title}</Select.Option>)
                    }
                </Select>
            </div>
            { content }
        </div>
    )
}

export default Participantes