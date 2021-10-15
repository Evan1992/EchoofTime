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
    
    root_id=`root_plan`
    
    root_plan={
        children:{},
        seconds:0,
        rank:-1
    }

    /* ========== Lifecycle ========== */
    componentDidMount() {

        axios.get(`/plans.json`)
        .then(response => {
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
                {/* Render plans with Rank == 0 */
                    this.root_plan.children && Object.keys(this.root_plan.children).map(item=>
                        <Plan g_state={this.g_state} id={item} key={item}></Plan>
                    )
                }
                
                <NewPlan g_state={this.g_state} rank={0} root_id={this.root_id}/>
            </div>
        )
    }

    /* ========== Methods ========== */
    updateTrigger(){
        this.setState({update:true})
    }
}

export default Plans