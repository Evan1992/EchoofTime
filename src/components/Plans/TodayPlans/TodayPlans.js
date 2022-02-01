/* ========== import React and React hooks ========== */
import React, { Component } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

/* ========== import components ========== */
import {dateStringIsToday, secondsToHHMMSS} from '../../Utils/Utils'

/* ========== import corresponding css ========== */
import classes from './TodayPlans.module.css'


class TodayPlans extends Component {
    state = {
        expected_seconds:0,
        logged_seconds:0
    }
    
    g_state = this.props.g_state;
    
    /* ========== Lifecycle ========== */
    componentDidMount(){
        // this.init_today_plans();
        // this.setState({update:true})
    }
    
    
    render(){
        this.init_today_plans();
        console.log("logged_seconds is: ", this.state.logged_seconds);
        return (
            <div>
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col className={classes.title}>Today</Col>
                </Row>
                
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col xs='auto'>Estimated Time: {secondsToHHMMSS(this.state.expected_seconds)}</Col>
                </Row>
                
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col xs='auto'>Used Time: {secondsToHHMMSS(this.state.logged_seconds)}</Col>
                </Row>
                
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col xs='auto'>Still Need: {secondsToHHMMSS(this.state.expected_seconds - this.state.logged_seconds)}</Col>
                </Row>
                
    
                {Object.keys(this.g_state.today_plans).map(item=>
                    <Row key={item}>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '30px'}}></div></Col>
                    <Col xs={1}>{this.g_state.plans[item].title}</Col>
                    </Row>)}        
            </div>
            
        )
        
            // <div>You have logged {secondsToHHMMSS(this.state.logged_seconds)}.</div>
            // <div>Expected spent time: Today's Plans still need {secondsToHHMMSS(this.state.expected_seconds - this.state.logged_seconds)}.</div>

    }

    /* ========== Methods ========== */
    
    dfs(today_plans, id){
        const plan = this.g_state.plans[id];
        if (plan && !plan.complete){
            if (plan.date && dateStringIsToday(plan.date)){
                today_plans[id] = true;
            } else {
                if (plan.child_id){
                    for (const key of Object.keys(plan.children)){
                        this.dfs(today_plans, key);
                    }
                }
            }
        }
    }
    
    
    init_today_plans(){
        var seconds = 0;
        this.g_state.today_plans = {};
        for(const [id, plan] of Object.entries(this.g_state.plans)){
            if (plan && plan.date && dateStringIsToday(plan.date) && !plan.complete){
                this.g_state.today_plans[id] = true;
                if (plan.expected_seconds) seconds = seconds + plan.expected_seconds;
            }
        }
        
        this.state.expected_seconds=seconds;
        this.update_logged_seconds();
        // console.log(`Today's plans = ${Object.keys(this.g_state.today_plans).length}`);
    }
    
    update_logged_seconds(){
        var seconds = 0;
        for (const id of Object.keys(this.g_state.today_plans)){
            seconds = seconds + this.g_state.plans[id].seconds;
        }
        this.state.logged_seconds=seconds;
    }
}


export default TodayPlans