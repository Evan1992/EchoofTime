import axios from '../../axios'
import React, { Component } from 'react'
import NewPlanForm from './NewPlan/NewPlanForm'
import Backdrop from '../UI/Backdrop'
import classes from './Plan.module.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {secondsToHour} from '../Utils/Utils'

class Plan extends Component {
    state = {
        show_form: false,
        show_children: true,
        show_calendar: false,
        plan_date: ""
    }
    
    g_state=this.props.g_state
    id = this.props.id
    
    /* ========== Lifecycle ========== */
    render() {
        const data = this.g_state.plans[this.id]
        // console.log(`Render ${this.id}`)
        if (!data) return null
        if (data.complete) return null
        return(
            <ul className={classes.tree_list}>
            {/* Render itself */}
                <div className={classes.tree_row}>
                    <div className={classes.check_icon} onClick={this.completeHandler}>
                        <img className={classes.check_icon_img} src="https://img.icons8.com/ios/50/000000/checked-checkbox--v1.png" alt=''/>
                    </div>
                    <div className={classes.plan_left_button} onClick={this.childrenToggleHandler}>
                        {/* Ternary expression: render the icon conditionally based on the state show_children using ternary operator */}
                        {data.children && Object.keys(data.children).length > 0 &&(!this.state.show_children ? 
                            <img className={classes.plan_left_button_img} src='expand.png' alt=''/> :
                            <img className={classes.plan_left_button_img} src='shrink.png' alt=''/>)
                        }
                    </div>
                    <div className={classes.plan_title}>{data.title || 'No title'}</div>
                    <div className={classes.plan_seconds}>{secondsToHour(data.seconds) || '0'}</div>
                    {this.state.plan_date !== "" &&
                        <div className={classes.plan_date}>{this.state.plan_date}</div>
                    }
                    <div className={classes.plan_right_buttons}>
                        <img className={classes.plan_calendar_icon} onClick={this.calendarToggleHandler} src="https://img.icons8.com/windows/32/000000/calendar.png" />
                        {this.state.show_calendar &&
                            <React.Fragment>
                                <Backdrop onClick={this.calendarToggleHandler} />
                                <div className={classes.plan_calendar}>
                                    <Calendar onChange={this.dateChangeHandler} />
                                </div>
                            </React.Fragment>
                        }
                        <img className={classes.plan_clock_button} onClick={this.clockToggleHandler} src="https://img.icons8.com/ios-glyphs/30/000000/--pocket-watch.png" alt=''/>
                        <div className={classes.plan_add_button} onClick={this.formToggleHandler}>+</div>
                    </div>
                </div>
            {/* Render children plans */
                this.state.show_children && data.children && Object.keys(data.children).map(item=>
                        <li className={classes.tree_item} key={item}><Plan className={classes.child_task} g_state={this.g_state} id={item} key={item}></Plan></li>
                )
            }
            
            {this.state.show_form &&
                <NewPlanForm
                    form_toggler={this.formToggleHandler}
                    parent={this.id}
                    rank={data.rank+1}
                    g_state={this.props.g_state}
                />
            }
            
            </ul>
        )
    }
    
    /* ========== Methods ========== */
    formToggleHandler = () => {
        this.setState({show_form: !this.state.show_form})
    }
    
    childrenToggleHandler = () => {
        this.setState({show_children: !this.state.show_children})
    }
    
    clockToggleHandler = () => {
        const now = Math.floor(Date.now()/1000)
        if (this.g_state.plan_in_progress){
            // end current plan
            console.log(`End current timer.`)
            const duration = now - this.g_state.plan_start_timestamp
            this.g_state.timer.reset_timer()
            this.updatePlanTimer(this.g_state.plan_in_progress, duration)
        }
        if (this.g_state.plan_in_progress === this.id){
            // end this plan
            this.g_state.plans_element.updateGState("plan_in_progress","")
        } else {
            console.log(`Start new timer.`)
            this.g_state.plans_element.updateGState("plan_in_progress",this.id)
            this.g_state.plans_element.updateGState("plan_start_timestamp",now)
            this.g_state.timer.start_timer()
        }
        
        this.g_state.plans_element.updateTrigger()
    }
    
    calendarToggleHandler = () => {
        this.setState({show_calendar: !this.state.show_calendar})
    }
    
    updatePlanTimer = (id, duration) => {
        console.log(`Update plans.`)
        while(id){
            const plan = this.g_state.plans[id]
            if (!plan) break
            const new_seconds = this.g_state.plans[id].seconds + duration
            plan.seconds = new_seconds
            axios.put(`/plans/${id}/seconds.json`, new_seconds)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
            
            id = this.g_state.plans[id].parent
        }
    }
    
    dateChangeHandler = (date) => {
        const month_lookup = new Map();
        month_lookup.set(0, 'Jan')
                    .set(1, 'Feb')
                    .set(2, 'Mar')
                    .set(3, 'Apr')
                    .set(4, 'May')
                    .set(5, 'Jun')
                    .set(6, 'Jul')
                    .set(7, 'Aug')
                    .set(8, 'Sep')
                    .set(9, 'Oct')
                    .set(10, 'Nov')
                    .set(11, 'Dec');
        const today = new Date()
        if(date.getDate() === today.getDate()) {
            this.setState({plan_date: "today"})
        }else {
            this.setState({plan_date: month_lookup.get(date.getMonth()) + " " + date.getDate() })
        }
        
        /* update database */
        
    }
    
    completeHandler = () => {
        this.g_state.plans[this.id].complete = true;
        axios.put(`/plans/${this.id}/complete.json`, true)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        this.g_state.plans_element.updateTrigger()
    }

}

export default Plan