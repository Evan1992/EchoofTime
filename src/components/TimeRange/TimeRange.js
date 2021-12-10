import React from 'react'
import classes from './TimeRange.module.css'

const TimeRange = (props) => {
    
    return (
        <div className={classes.input_frame}>
            <input className={classes.input_time} type="number" onChange={props.plan.expectedHoursChangeHandler} value = {props.plan.state.expected_hours}/>:
            <input className={classes.input_time} type="number" onChange={props.plan.expectedMinutesChangeHandler} value = {props.plan.state.expected_minutes}/>:
            <input className={classes.input_time} type="number" onChange={props.plan.expectedSecondsChangeHandler} value = {props.plan.state.expected_seconds}/>
        </div>
    )
}

export default TimeRange