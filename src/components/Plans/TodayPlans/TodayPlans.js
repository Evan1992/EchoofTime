/* ========== import React and React hooks ========== */
import React, { Component } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

/* ========== import components ========== */
import {dateStringIsToday, secondsToHour} from '../../Utils/Utils'

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
        this.init_today_plans();
        this.setState({update:true})
    }
    
    
    render(){
        return (
            <div className={classes.plans}>
            <Container>
            <div>Today's Plans still need {secondsToHour(this.state.expected_seconds - this.state.logged_seconds)}.</div>
            {Object.keys(this.g_state.today_plans).map(item=>
                <Row key={item}>
                <Col xs={1}>{this.g_state.plans[item].title}</Col>
                </Row>)}        
            </Container>
            </div>
            
        )

    }

    /* ========== Methods ========== */
    init_today_plans(){
        var seconds = 0;
        this.g_state.today_plans = {};
        for(const [id, plan] of Object.entries(this.g_state.plans)){
            if (plan && plan.date && dateStringIsToday(plan.date) && !plan.complete){
                this.g_state.today_plans[id] = true;
                if (plan.expected_seconds) seconds = seconds + plan.expected_seconds;
            }
        }
        
        this.setState({expected_seconds: seconds});
        this.update_logged_seconds();
        console.log(`Today's plans = ${Object.keys(this.g_state.today_plans).length}`);
    }
    
    update_logged_seconds(){
        var seconds = 0;
        for (const id of Object.keys(this.g_state.today_plans)){
            seconds = seconds + this.g_state.plans[id].seconds;
        }
        this.setState({logged_seconds:seconds});
    }
}


export default TodayPlans