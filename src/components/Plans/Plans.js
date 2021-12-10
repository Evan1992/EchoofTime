import React, { Component } from 'react';

/* ========== import react components ========== */
import Plan from './Plan'
import NewPlan from '../Plans/NewPlan/NewPlan'
import Timer from '../Timer/Timer'
import TodayPlans from './TodayPlans/TodayPlans'

/* ========== import other libraries ========== */
import axios from '../../axios'
import {secondsToHour} from '../Utils/Utils'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

/* ========== import corresponding css ========== */
import classes from './Plans.module.css'

class Plans extends Component {
    state = {
        isLoading : true,
        update: true
    }
    
    g_state = {
        today_plans:{},
        plan_in_progress: null,
        plan_start_timestamp: 0,
        plans_element: this,
        timer: null,
        plan_promise: null
    }
    
    root_id=`root_plan`
    
    root_plan={
        children:{},
        seconds:0,
        rank:-1
    }

    /* ========== Lifecycle ========== */
    componentDidMount() {

        this.g_state.plan_promise = axios.get(`/plans.json`);
        this.g_state.plan_promise.then(response => {
            if(response.data != null) {
                console.log(response)
                this.g_state.plans=response.data
                const new_root_plan = this.g_state.plans[this.root_id]
                if (new_root_plan){
                    this.root_plan = new_root_plan
                } else {
                    axios.put(`/plans/${this.root_id}.json`, this.root_plan)
                        .then(response=>{
                            console.log(`New root plan`)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
                this.setState({isLoading:false})
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {
        return(
            <div className={classes.plans}>
                <div> You have logged {secondsToHour(this.root_plan.seconds)} </div>
                <Timer g_state={this.g_state}/>
                {this.g_state.plans && <TodayPlans g_state={this.g_state}/>}
                <Container fluid>
                    {/* Render plans with Rank == 0 */
                        this.root_plan.children && Object.keys(this.root_plan.children).map(item=>
                            <Plan g_state={this.g_state} id={item} key={item}></Plan>
                        )
                    }
                </Container>
                
                <NewPlan g_state={this.g_state} rank={0} root_id={this.root_id}/>
            </div>
        )
    }

    /* ========== Methods ========== */
    updateTrigger(){
        this.setState({update:true})
    }
    
    updateGState(key, value){
        console.log(`Update global value ${key} = ${value}`)
        this.g_state[key]=value
        this.putDatabase(`/g_state/${key}.json`, value)
    }
    
    updatePlanAttr(id, attr, value){
        this.g_state.plans[id][attr]=value
        this.putDatabase(`/plans/${id}/${attr}.json`, value)
    }
    
    putDatabase(path, target){
        if (this.isString(target)) target = `"${target}"`
        axios.put(path, target)
            .then(response=>{
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    isString(x){
        return typeof x === 'string' || x instanceof String
    }
    
}

export default Plans