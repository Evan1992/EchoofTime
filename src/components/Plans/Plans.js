import React, { Component } from 'react';

/* ========== import react components ========== */
import Plan from './Plan'
import NewPlan from '../Plans/NewPlan/NewPlan'
import CurrentTimer from '../Timer/CurrentTimer'
import TodayPlans from './TodayPlans/TodayPlans'

/* ========== import other libraries ========== */
import axios from '../../axios'
import {secondsToHour} from '../Utils/Utils'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../store/auth-context';

/* ========== import corresponding css ========== */
import classes from './Plans.module.css'

class Plans extends Component {
    state = {
        isLoading : true,
        update: true
    }
    
    g_state = {
        today_plans:{},
        plan_components:{},
        plan_in_progress: null,
        plan_start_timestamp: 0,
        plans_element: this,
        timer: "",
        plan_promise: null
    }
    
    root_id=`root_plan`
    
    static contextType = AuthContext;
    
    user_path = this.context.userID;
    
    root_plan={
        children:{},
        seconds:0,
        rank:-1
    }

    /* ========== Lifecycle ========== */
    componentDidMount() {

        this.g_state.plan_promise = axios.get(`${this.user_path}/plans.json`);
        this.g_state.plan_promise.then(response => {
            if(response.data != null) {
                console.log(response)
                this.g_state.plans=response.data
                
                // Find exist root plan. If not found, put new one in database
                const new_root_plan = this.g_state.plans[this.root_id]
                if (new_root_plan){
                    this.root_plan = new_root_plan
                } else {
                    this.addRootPlan();
                }
                this.setState({isLoading:false});
            } else {
                // Create new plan list for the user
                this.addRootPlan();
            }
            
            
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {
        return(
            <div className={classes.plans}>
                {//<div> You have logged {secondsToHour(this.root_plan.seconds)} </div>
                }
                
                <Container fluid className={classes.container}>
                    <CurrentTimer g_state={this.g_state} />
                </Container>
                
                <Container fluid className={classes.container}>
                    {/* Render plans with Rank == 0 */
                        this.root_plan.children && Object.keys(this.root_plan.children).map(item=>
                            <Plan g_state={this.g_state} id={item} key={item}></Plan>
                        )
                    }
                </Container>
                
                <NewPlan g_state={this.g_state} rank={0} root_id={this.root_id}/>
                
                <Container fluid className={classes.container}>
                    {this.g_state.plans && <TodayPlans g_state={this.g_state}/>}
                </Container>
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
        this.putDatabase(`${this.user_path}/g_state/${key}.json`, value)
    }
    
    updatePlanAttr(id, attr, value){
        this.g_state.plans[id][attr]=value
        this.putDatabase(`${this.user_path}/plans/${id}/${attr}.json`, value)
    }
    
    updateExpectedSecond(id, delta){
        const data = this.g_state.plans[id]
        if (!data.expected_seconds) data.expected_seconds = 0;
        this.updatePlanAttr(id, "expected_seconds", data.expected_seconds + delta)
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
    
    addPlanChild(id, child_id){
        console.log(`${id} add children ${child_id}`)
        const parent_plan = this.g_state.plans[id]
        if (!parent_plan.children) parent_plan.children={}
        parent_plan.children[child_id]=true
        axios.put(`${this.user_path}/plans/${id}/children/${child_id}.json`, true)
        .then(response =>{
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    addNewPlan(target){
        axios.post(`${this.user_path}/plans.json`, target)
        .then(response => {
            console.log(response)
            const new_id = response.data.name
            
            this.g_state.plans[new_id]=target
            
            // update parent's children
            
            if (target.parent)  {
                this.addPlanChild(target.parent, new_id)
            }
            this.updateTrigger()
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    addRootPlan(){
        axios.put(`${this.user_path}/plans/${this.root_id}.json`, this.root_plan)
        .then(response=>{
            console.log(`New root plan`)
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