import React, { Component } from 'react'
import classes from './Plan.module.css'
import PropTypes from 'prop-types'

import SubPlan from './SubPlan/SubPlan'

import addLogo     from '../../../assets/images/icon_add.png'
import expandLogo  from '../../../assets/images/icon_expand.png'
import commentLogo from '../../../assets/images/icon_comment.png'

class Plan extends Component{
    state = {
        show_subPlans: false,
        show_subPlan_form: false,
    }

    render(){
        let short_term_plan = null
        short_term_plan = (
            <div>
                <div className={classes.wrapper}>
                    <img src={expandLogo} alt="" onClick={this.showSubPlanHandler}/>
                    <div>
                        {this.props.plan.title}
                        <img src={commentLogo} alt="" />
                    </div>
                    <img src={addLogo} alt="" onClick={this.addSubPlanHandler}/>
                </div>
                <SubPlan
                    sub_plans           = {this.props.plan.sub_plans} 
                    show_subPlans       = {this.state.show_subPlans}
                    show_subPlan_form   = {this.state.show_subPlan_form}
                    cancel_subPlan_form = {this.cancel_subPlan_form}
                    post_subPlan        = {this.props.postSubPlanHandler}
                    input_change1       = {(event) => this.inputChangeHandler1(event)}
                    input_change2       = {(event) => this.inputChangeHandler2(event)}
                    
                />
            </div>
        )
        return(
            <div>
                {short_term_plan}
            </div>
        )
    }

    showSubPlanHandler = () =>{
        let show_subPlans = this.state.show_subPlans
        let plan = this.props.plan
        if('sub_plans' in plan){
            show_subPlans = !(this.state.show_subPlans)
            this.setState({show_subPlans})
        }
    }

    addSubPlanHandler = () =>{
        let show_subPlan_form = this.state.show_subPlan_form
        show_subPlan_form = !(this.state.show_subPlan_form)
        this.setState({show_subPlan_form}, () =>{
            if(this.state.show_subPlan_form){
                if(!('sub_plans' in this.props.plan)){
                    this.props.plan.sub_plans = []
                }
                this.props.plan.sub_plans.push({
                    title:   '',
                    comment: ''
                })
            }else{
                this.props.plan.sub_plans.pop()
            }
        })
    }

    cancel_subPlan_form = () =>{
        let show_subPlan_form = this.state.show_subPlan_form
        show_subPlan_form = !(this.state.show_subPlan_form)
        this.setState({show_subPlan_form})
        this.props.plan.sub_plans.pop()
    }

    inputChangeHandler1 = (event) =>{
        this.props.plan.sub_plans[this.props.plan.sub_plans.length-1].title = event.target.value
    }
    inputChangeHandler2 = (event) =>{
        this.props.plan.sub_plans[this.props.plan.sub_plans.length-1].comment = event.target.value
    }
}



/**
 * @note propTypes is a special property, react will watch out in development
 *       mode and give you warning if you pass incorrect props
 */
Plan.propTypes = {
    plan: PropTypes.object,
    addSubPlanHandler: PropTypes.func
}

export default Plan