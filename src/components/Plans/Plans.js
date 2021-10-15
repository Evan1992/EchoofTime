import React, { Component } from 'react';

/* ========== import react components ========== */
import Plan from './Plan'
import NewPlan from '../Plans/NewPlan/NewPlan'

/* ========== import other libraries ========== */
import axios from '../../axios'

/* ========== import corresponding css ========== */
import classes from './Plans.module.css'

class Plans extends Component {
    state = {
        isLoading : true,
        update: true
    }
    
    g_state = {
        plan_in_progress: null,
        plan_start_timestamp: 0,
        plans_element: this,
        update_trigger: this.updateTrigger
    }

    /* ========== Lifecycle ========== */
    componentDidMount() {
        axios.get(`/active_plans.json`)
        .then(response => {
            if(response.data != null) {
                console.log(response)
                this.g_state.active_plans=response.data
                this.setState({isLoading:false})
            }
        })
        .catch(error => {
            console.log(error)
        })
        
        axios.get(`/plans.json`)
        .then(response => {
            if(response.data != null) {
                console.log(response)
                this.g_state.plans=response.data
                this.setState({isLoading:false})
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {
        // console.log(`In Render() active_plans ${this.g_state.active_plans}`)
        return(
            <div className={classes.plans}>
                {/* Render plans with Rank == 0 */
                    this.g_state.active_plans && this.g_state.plans && Object.keys(this.g_state.active_plans).map(item=>
                        <Plan g_state={this.g_state} id={item} key={item}></Plan>
                    )
                }
                
                <NewPlan g_state={this.g_state}/>
            </div>
        )
    }

    /* ========== Methods ========== */
    updateTrigger(){
        this.setState({update:true})
    }
}

export default Plans