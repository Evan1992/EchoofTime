import axios from '../../axios'
import React, { Component } from 'react'
import NewPlanForm from './NewPlan/NewPlanForm'
import classes from './Plan.module.css'

class Plan extends Component {
    state = {
        show_form: false
    }
    
    g_state=this.props.g_state
    id = this.props.id
    
    /* ========== Lifecycle ========== */
    render() {
        const data = this.g_state.plans[this.id]
        console.log(`Render ${this.id}`)
        if (!data) return null
        return(
            
            <div >
            {/* Render itself */}
                <div className={classes.plan}>
                <div className={classes.plan_title}>{data.title || 'No title'}</div>
                <div className={classes.plan_button} onClick={this.formToggleHandler}>+</div>
                </div>
            {/* Render children plans */
                data.children && Object.keys(data.children).map(item=>
                        <Plan g_state={this.g_state} id={item} key={item}></Plan>
                )
            }
            
            {this.state.show_form &&
                <NewPlanForm
                    form_toggler={this.formToggleHandler}
                    parent={this.id}
                    rank={data.rank+1}
                />
            }
            
            </div>
        )
    }
    
    /* ========== Methods ========== */
    formToggleHandler = () => {
        this.setState({show_form: !this.state.show_form})
    }
}                                                                                                                                                                                                                     

export default Plan