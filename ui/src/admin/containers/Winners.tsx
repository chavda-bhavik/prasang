import React, { ReactNode, useState } from 'react'
import { Select, Spin, Alert } from "antd";
import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/client'

import PhotoList from '../components/winners/PhotoList';
import Sidebar from '../components/winners/Sidebar';
import classes from './Winners.module.css'

const FETCH_EVENTS_QUERY = gql`
    query {
        events {
            eventId
            title
        }
    }
`;
const FETCH_PHOTOS_QUERY = gql`
    query photos($eventId: ID, $startLikes: Int!, $endLikes: Int!) {
        photos(options: {
            eventId: $eventId,
            likesRange: {
                start: $startLikes,
                end: $endLikes
            }
        }){
            photoId
            imageUrl
            likes
            comments {
                commentId
            }
            user {
                name
            }
            winner
        }
    }
`
const DECIDE_WINNER_MUTATION = gql`
    mutation setWinner($photoId: ID!) {
        setWinner(photoId: $photoId) {
            winnerId
            winDate
        }
    }
`

const Winners = () => {
    const [eventId, setEventId] = useState<String>("");
    const [winnerPhotoId, setWinnerPhotoId] = useState<String>("");
    const [likesRange, setLikesRange] = useState<[number, number]>([0, 100]);

    const [ setWinner, { data:setWinnerData, error:setWinnerError, loading:setWinnerLoading } ] = useMutation(DECIDE_WINNER_MUTATION);
    const { data:eventsData, loading:eventsLoading } = useQuery(FETCH_EVENTS_QUERY);
    const { data:photosData, refetch, loading:photosLoading } = useQuery(FETCH_PHOTOS_QUERY, {
        variables: { 
            eventId,
            startLikes: likesRange[0],
            endLikes: likesRange[1]
        }
    });

    const decideWinner = () => {
        setWinner({
            variables: {
                photoId: winnerPhotoId
            }
        });
    }

    const onEventChange = (eventId:string) => {
        setEventId(eventId);
        refetch();
    }
    const onLikesChange = (likes:[number, number]) => {
        setLikesRange(likes);
        refetch();
    }

    let alertContent:ReactNode = "";
    if(setWinnerData) {
        alertContent = <Alert type="success" message="Winner decided!" closable={true} />
    } else if(setWinnerError) {
        alertContent = <Alert type="error" message={setWinnerError.message} />
    }

    return (
        <div className={classes.section}>
            { alertContent }       
            <div className={classes.header}>
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
            <div className={classes.body}>
                <div style={{ width: "80%", padding: '5px 8px' }}>
                { 
                    photosLoading ? 
                    <Spin /> : <PhotoList setWinnerPhotoId={setWinnerPhotoId} photoData={photosData} />
                }
                </div>
                <Sidebar setWinnerLoading={setWinnerLoading} submitWinner={decideWinner} likesChange={onLikesChange} likes={likesRange} />
            </div>
        </div>
    )
}

export default Winners;