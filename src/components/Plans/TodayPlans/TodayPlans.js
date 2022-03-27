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
        logged_seconds:0,
        still_need_seconds:0
    }
    
    g_state = this.props.g_state;
    
    /* ========== Lifecycle ========== */
    componentDidMount(){
        // this.init_today_plans();
        // this.setState({update:true});
    }
    
    
    render(){
        this.summary_today_plans();
        
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
                    <Col xs='auto'>Still Need: {secondsToHHMMSS(this.state.still_need_seconds)}</Col>
                </Row>
                
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col xs='auto'>Still Need: {secondsToHHMMSS(this.state.expected_seconds - this.state.logged_seconds)}</Col>
                </Row>
                
            </div>
            
        )
    }

    /* ========== Methods ========== */
    // dfs(today_plans, id){
    //     const plan = this.g_state.plans[id];
    //     if (plan && !plan.complete){
    //         if (plan.date && dateStringIsToday(plan.date)){
    //             today_plans[id] = true;
    //         } else {
    //             if (plan.child_id){
    //                 for (const key of Object.keys(plan.children)){
    //                     this.dfs(today_plans, key);
    //                 }
    //             }
    //         }
    //     }
    // }
    
    
    summary_today_plans(){
        var expected_seconds = 0;
        var logged_seconds = 0;
        let still_need_seconds=0;
        // this.g_state.today_plans = {};
        for(const [id, plan] of Object.entries(this.g_state.plans)){
            if (plan && plan.date && dateStringIsToday(plan.date)){
                // if (!plan.complete) this.g_state.today_plans[id] = true;
                
                if (plan.expected_seconds) {
                    expected_seconds = expected_seconds + plan.expected_seconds;
                    if (plan.complete){
                        logged_seconds = logged_seconds + plan.expected_seconds;
                    } else if (plan.seconds) {
                        still_need_seconds += plan.expected_seconds;
                        logged_seconds = logged_seconds + Math.min(plan.expected_seconds, plan.seconds);
                    } else {
                        still_need_seconds += plan.expected_seconds;
                    }
                }
            }
        }
        
        
        this.state.expected_seconds=expected_seconds;
        this.state.logged_seconds=logged_seconds;
        this.state.still_need_seconds=still_need_seconds;
        
        // this.update_logged_seconds();
        // console.log(`Today's plans = ${Object.keys(this.g_state.today_plans).length}`);
        
        // let still_need_seconds=0;
        // console.log("this.g_state.today_plans is: ", this.g_state.today_plans)
        // for (const id of Object.keys(this.g_state.today_plans)){
        //     still_need_seconds = still_need_seconds + this.g_state.plans[id].expected_seconds;
        // }
        // this.state.still_need_seconds=still_need_seconds;
    }
    
    // update_logged_seconds(){
    //     var seconds = 0;
    //     for (const id of Object.keys(this.g_state.today_plans)){
    //         seconds = seconds + this.g_state.plans[id].seconds;
    //     }
    //     this.state.logged_seconds=seconds;
    // }
}


export default TodayPlans