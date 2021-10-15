import axios from '../../axios'
import React, { Component } from 'react'
import NewPlanForm from './NewPlan/NewPlanForm'
import classes from './Plan.module.css'

class Plan extends Component {
    state = {
        show_form: false,
        show_children: true,
    }
    
    g_state=this.props.g_state
    id = this.props.id
    
    /* ========== Lifecycle ========== */
    render() {
        const data = this.g_state.plans[this.id]
        // console.log(`Render ${this.id}`)
        if (!data) return null
        return(
            <ul className={classes.tree_list}>
            {/* Render itself */}
                <div className={classes.tree_row}>
                    <div className={classes.plan_left_button} onClick={this.childrenToggleHandler}>
                        {/* Render the icon conditionally based on the state show_children using ternary operator */}
                        {!this.state.show_children === true ? 
                            <img className={classes.plan_left_button_img} src='expand.png' alt=''/> :
                            <img className={classes.plan_left_button_img} src='shrink.png' alt=''/> 
                        }
                    </div>
                    <div className={classes.plan_title}>{data.title || 'No title'}</div>
                    <div className={classes.plan_seconds}>{data.seconds || '0'}</div>
                    <div className={classes.plan_right_buttons}>
                        <img className={classes.plan_clock_button} onClick={this.clockToggleHandler} src="https://img.icons8.com/ios-glyphs/30/000000/--pocket-watch.png" alt=''/>
                        <div className={classes.plan_add_button} onClick={this.formToggleHandler}>+</div>
                    </div>
                </div>
            {/* Render children plans */
                this.state.show_children && data.children && Object.keys(data.children).map(item=>
                        <li className={classes.tree_item} key={item}><Plan className={classes.child_task} g_state={this.g_state} id={item} key={item}></Plan></li>
                )
            }
            
            {this.state.show_form &&
                <NewPlanForm
                    form_toggler={this.formToggleHandler}
                    parent={this.id}
                    rank={data.rank+1}
                    g_state={this.props.g_state}
                />
            }
            
            </ul>
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
            this.updatePlanTimer(this.g_state.plan_in_progress, duration)
        }
        if (this.g_state.plan_in_progress === this.id){
            // end this plan
            this.g_state.plan_in_progress = null
        } else {
            console.log(`Start new timer.`)
            this.g_state.plan_in_progress = this.id
            this.g_state.plan_start_timestamp = now
        }
        
        this.g_state.plans_element.updateTrigger()
    }
    
    updatePlanTimer = (id, duration) => {
        console.log(`Update plans.`)
        while(id){
            const plan = this.g_state.plans[id]
            if (!plan) break
            const new_seconds = this.g_state.plans[id].seconds + duration
            plan.seconds = new_seconds
            axios.put(`/plans/${id}/seconds.json`, new_seconds)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                        console.log(error)
                })
            
            id = this.g_state.plans[id].parent
        }
    }
}                                                                                                                                                                                                                     

export default Plan