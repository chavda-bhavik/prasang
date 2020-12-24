import React from 'react'
import { Slider, Button } from 'antd';
import classes from './Sidebar.module.css'

interface SidebarProps {
    likesChange: (range: [number, number]) => void
    likes: [number, number]
    submitWinner: () => void
    setWinnerLoading: boolean
}

const Sidebar = (props: SidebarProps) => {
    const onFinalChange = (values:[ number, number ]) => {
        props.likesChange(values);
    }
    return (
        <div className={classes.section}>
            <h4><b>Likes</b></h4>
            <Slider
                max={1000}
                min={0}
                range
                style={{ color: 'chocolate' }}
                step={50}
                defaultValue={props.likes}
                onAfterChange={onFinalChange}
            />
            <Button loading={props.setWinnerLoading} type="default" onClick={props.submitWinner}>Decide Winner</Button>
        </div>
    )
}

export default Sidebar;