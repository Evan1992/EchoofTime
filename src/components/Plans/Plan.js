import axios from '../../axios'
import React, { Component } from 'react'
import NewPlanForm from './NewPlan/NewPlanForm'
import Backdrop from '../UI/Backdrop'
import classes from './Plan.module.css'
import Calendar from 'react-calendar';
import TimeRange from '../TimeRange/TimeRange';
import Timer from '../Timer/Timer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-calendar/dist/Calendar.css';


import {dateToReadable, secondsToHHMMSS} from '../Utils/Utils'

class Plan extends Component {
    state = {
        show_form: false,
        show_children: true,
        show_calendar: false,
        plan_date: "",
        expected_hours: 0,
        expected_minutes: 0,
        expected_seconds: 0
    }
    
    g_state=this.props.g_state
    id = this.props.id
    timer = null
    
    /* ========== Lifecycle ========== */
    componentDidMount() {
        this.g_state.plan_components[this.id] = this;
        const data = this.g_state.plans[this.id];
        if (!data) return;
        if (!data.expected_seconds) data.expected_seconds = 0;
        const seconds = data.expected_seconds;
        this.setState({expected_hours: (seconds/3600)>>0, expected_minutes:((seconds%3600)/60)>>0, expected_seconds:seconds%60});
        
    }
    
    render() {
        const data = this.g_state.plans[this.id]
        // console.log(`Render ${this.id}`)
        if (!data) return null
        if (data.complete) return null
        return(
            <React.Fragment>
                {/* Render itself */}
                <Row>
                    <Col xs={1} />
                    <Col xs='auto'>
                        <div className={classes.plan_left_button} onClick={this.childrenToggleHandler}>
                            {/* Ternary expression: render the icon conditionally based on the state show_children using ternary operator */}
                            {data.children && Object.keys(data.children).length > 0 &&(!this.state.show_children ? 
                                <img className={classes.plan_left_button_img} src='https://img.icons8.com/material-rounded/24/000000/more-than.png' alt='' /> :
                                <img className={classes.plan_left_button_img} src='https://img.icons8.com/ios-filled/50/000000/collapse-arrow.png'  alt=''/>)
                            }
                        </div>
                    </Col>
                
                    <Col xs={{ span: 4}} style={{display:'flex', justifyContent:'left'}}>
                        <div style={{'text-indent':`calc(${data.rank} * 20px)`}}>{data.title || 'No title'}</div>
                    </Col>
                    
                    <Col xs={2}>
                        <TimeRange 
                            // expectedHoursChangeHandler={this.expectedHoursChangeHandler}
                            // expectedMinutesChangeHandler={this.expectedMinutesChangeHandler}
                            // expectedSecondsChangeHandler={this.expectedSecondsChangeHandler}
                            // expected_hours = {this.expected_hours}
                            // expected_minutes = {this.expected_minutes}
                            // expected_seconds = {this.expected_seconds}
                            plan = {this}
                        />
                    </Col>
                    
                    <Col xs={2}>
                        <Timer seconds={data.seconds} plan_component={this} />
                    </Col>
                    
                    <Col xs={1}>
                        <div className={classes.plan_date}>{data.date != null ? dateToReadable(data.date) : ''}</div>
                    </Col>
                    
                    <Col xs="auto" style={{padding: 0}}>
                        <img className={classes.plan_calendar_icon} onClick={this.calendarToggleHandler} src="https://img.icons8.com/windows/32/000000/calendar.png" />
                        {this.state.show_calendar &&
                            <React.Fragment>
                                <Backdrop onClick={this.calendarToggleHandler} />
                                <div className={classes.plan_calendar}>
                                    <Calendar onChange={this.dateChangeHandler} />
                                </div>
                            </React.Fragment>
                        }
                    </Col>
                    
                    <Col xs="auto" style={{padding: 0}}>
                        <img className={classes.plan_clock_button} onClick={this.clockToggleHandler} src="https://img.icons8.com/ios-glyphs/30/000000/--pocket-watch.png" alt=''/>
                    </Col>
                    
                    <Col xs="auto" style={{padding: 0}}>
                        <div className={classes.plan_add_button} onClick={this.formToggleHandler}>+</div>
                    </Col>
                    
                    <Col xs="auto">
                        <div className={classes.check_icon} onClick={this.completeHandler}>
                            <img className={classes.check_icon_img} src="https://img.icons8.com/ios/50/000000/checked-checkbox--v1.png" alt=''/>
                        </div>
                    </Col>
                </Row>
                
                <Row>
                    {this.state.show_form &&
                        <Container fluid>
                            <Row>
                                <Col xs={1}></Col>
                                <Col xs="auto"><div style={{width: `calc(20px + ${data.rank} * 20px)`}}></div></Col>
                                <Col xs={{ span: 5}} style={{display:'flex', justifyContent:'left'}}>
                                    <NewPlanForm
                                        form_toggler={this.formToggleHandler}
                                        parent={this.id}
                                        rank={data.rank+1}
                                        g_state={this.props.g_state}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    }
                </Row>
                
                {/* Render children plans */
                this.state.show_children && data.children && Object.keys(data.children).map(item=>
                    // <li className={classes.tree_item} key={item}><Plan className={classes.child_task} g_state={this.g_state} id={item} key={item}></Plan></li>
                    <Plan className={classes.child_task} g_state={this.g_state} id={item} key={item}></Plan>
                )
                }
                
                
            </React.Fragment>
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
            this.startTimerRecursively(this.id)
        }
        
        this.g_state.plans_element.updateTrigger()
    }
    
    startTimerRecursively(id){
        while(id){
            const plan_component = this.g_state.plan_components[id];
            if (!plan_component) break
            if (plan_component.timer) plan_component.timer.start_timer();
            id = this.g_state.plans[id].parent
        }
    }
    
    calendarToggleHandler = () => {
        this.setState({show_calendar: !this.state.show_calendar})
    }
    
    updatePlanTimer = (id, duration) => {
        console.log(`Update plans.`)
        while(id){
            const plan = this.g_state.plans[id]
            if (!plan) break
            // pause timer
            const plan_component = this.g_state.plan_components[id];
            if (plan_component && plan_component.timer) plan_component.timer.pause_timer();
            
            const new_seconds = this.g_state.plans[id].seconds + duration
            // plan.seconds = new_seconds
            this.g_state.plans_element.updatePlanAttr(id, "seconds", new_seconds);
            // axios.put(`/plans/${id}/seconds.json`, new_seconds)
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
            
            id = this.g_state.plans[id].parent
        }
    }
    
    dateChangeHandler = (date) => {
        // const month_lookup = new Map();
        // month_lookup.set(0, 'Jan')
        //             .set(1, 'Feb')
        //             .set(2, 'Mar')
        //             .set(3, 'Apr')
        //             .set(4, 'May')
        //             .set(5, 'Jun')
        //             .set(6, 'Jul')
        //             .set(7, 'Aug')
        //             .set(8, 'Sep')
        //             .set(9, 'Oct')
        //             .set(10, 'Nov')
        //             .set(11, 'Dec');
        // const today = new Date()
        // if(date.getDate() === today.getDate()) {
        //     this.setState({plan_date: "today"})
        // }else {
        //     this.setState({plan_date: month_lookup.get(date.getMonth()) + " " + date.getDate() })
        // }
        
        /* update database in format YYYY-MM-DD */
        this.g_state.plans_element.updatePlanAttr(this.id, "date", date.toISOString().slice(0,10))
        this.g_state.plans_element.updateTrigger();
        
    }
    
    completeHandler = () => {
        this.g_state.plans_element.updatePlanAttr(this.id, "complete", true)
        // this.g_state.plans[this.id].complete = true;
        // axios.put(`/plans/${this.id}/complete.json`, true)
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        
        this.g_state.plans_element.updateTrigger()
    }
    
    expectedHoursChangeHandler = (event) => {
        this.setState({expected_hours: event.target.value});
        const seconds = event.target.value * 3600 + this.state.expected_minutes * 60 + this.state.expected_seconds;
        this.g_state.plans_element.updatePlanAttr(this.id, "expected_seconds", seconds);
    }
    expectedMinutesChangeHandler = (event) => {
        this.setState({expected_minutes: event.target.value})
        const seconds = this.state.expected_hours * 3600 + event.target.value * 60 + this.state.expected_seconds;
        this.g_state.plans_element.updatePlanAttr(this.id, "expected_seconds", seconds);
    }
    expectedSecondsChangeHandler = (event) => {
        this.setState({expected_seconds: event.target.value})
        const seconds = this.state.expected_hours * 3600 + this.state.expected_minutes * 60 + event.target.value;
        this.g_state.plans_element.updatePlanAttr(this.id, "expected_seconds", seconds);
    }
}

export default Plan