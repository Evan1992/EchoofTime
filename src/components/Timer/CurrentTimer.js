/* ========== import react components ========== */
import React, { Component } from 'react';
import {secondsToHHMMSS} from '../Utils/Utils'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* ========== import corresponding css ========== */
// import classes from './Timer.module.css'

class CurrentTimer extends Component {
 
    state = {
        seconds:0,
        plan_title:"NULL"
    }
    
    interval = null
    plan_title = ""
    g_state = this.props.g_state
    
    componentDidMount(){
        this.props.g_state.timer=this;
    }
    
    render(){
        return(
            <div>
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col>Current Plan: {this.state.plan_title}</Col>
                </Row>
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col>Current Period: {secondsToHHMMSS(this.state.seconds)}</Col>
                </Row>
            </div>
        
        )
    }
    
    tick(){
        this.setState({seconds:this.state.seconds+1})
    }
    
    reset_timer(){
        console.log(`Timer reset`)
        if (this.interval) {
            clearInterval(this.interval)
        }
        this.setState({seconds:0, plan_title:"NULL"})
    }
    
    pause_timer(){
        console.log(`Timer reset`)
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
    
    set_timer(n){
        this.setState({seconds:n})
    }
    
    get_seconds(){
        return this.state.seconds;
    }
    
    
    start_timer(){
        console.log(`Timer start`)
        const plan_id = this.g_state.plan_in_progress
        const plan_title = this.g_state.plans[plan_id].title
        this.setState({plan_title:plan_title})
        this.interval = setInterval(() => this.tick(), 1000)
    }
    
}

export default CurrentTimer