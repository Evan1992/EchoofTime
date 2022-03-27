/* ========== import React and React hooks ========== */
import React, { Component } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

/* ========== import components ========== */
import {dateStringIsTomorrow, secondsToHHMMSS} from '../../Utils/Utils'

/* ========== import corresponding css ========== */
import classes from './TomorrowPlans.module.css'

class TomorrowPlans extends Component {
    state = {
        expected_seconds:0
    }
    
    g_state = this.props.g_state;
    
    render(){
        this.init_tomorrow_plans();
        
        return (
            <div>
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col className={classes.title}>Tomorrow</Col>
                </Row>
                
                <Row>
                    <Col xs={1} />
                    <Col xs="auto"><div style={{width: '20px'}}></div></Col>
                    <Col xs='auto'>Estimated Time: {secondsToHHMMSS(this.state.expected_seconds)}</Col>
                </Row>
            </div>
            
        )
    }

    /* ========== Methods ========== */
    init_tomorrow_plans(){
        var seconds = 0;
        for(const [id, plan] of Object.entries(this.g_state.plans)){
            if (plan && plan.date && dateStringIsTomorrow(plan.date) && !plan.complete){
                if (plan.expected_seconds) seconds = seconds + plan.expected_seconds;
            }
        }
        // "2022-02-04"
        this.state.expected_seconds=seconds;
    }
}

export default TomorrowPlans