import React, { Component } from 'react'
import axios from '../../axios'
import classes from './ShortTermPlan.module.css'
import Plan from './Plan/Plan'
import NewPlan from './Plan/NewPlan'

class ShortTermPlan extends Component {
    state = {
        new: true,
        count: 0,
        title: ''
    }

    /* ========== Lifecycle ========== */
    render() {
        if (this.props.long_term_plan_new) {
            return null;
        }

        let short_term_plan = null
        if (this.state.new) {
            short_term_plan = (
                <div>
                    <label htmlFor="short_term_plan_title">Title</label>
                    <input type="text" id="short_term_plan_title" onChange={(event) => this.inputChangeHandler1(event)} required />
                    <button type="button" onClick={this.postPlanHandler}>Start</button>
                </div>
            )
        } else {
            short_term_plan = (
                <div>
                    <div className={classes.title}>{this.state.title}</div>
                    <Plan 
                        short_term_plan_new={this.state.new}
                        short_term_plan_count={this.state.count}
                    />
                    <NewPlan />
                    {/* <ul>
                        {this.state.short_term_plans.map((plan, index) => {
                            return (
                                <div key={index}>
                                    <Plan
                                        plan={plan}
                                        addSubPlanHandler={() => this.addSubPlanHandler(index)}
                                        postSubPlanHandler={(event) => this.postSubPlanHandler(event, index)}
                                    />

                                    <NewPlan
                                        postPlanHandler={(event) => this.postPlanHandler(event)}
                                        short_term_plan={this.state.short_term_plan}
                                        inputChangeHandler2={this.inputChangeHandler2}
                                        inputChangeHandler3={this.inputChangeHandler3}
                                    />
                                </div>
                            )
                        })}
                    </ul> */}
                </div>
            )
        }

        return (
            <div className={classes.short_term_plan}>
                <div className={classes.short_term_plan_title}>
                    Short Term Plan
                    <button type="button" onClick={this.refreshPlanHandler}>NEW</button>
                </div>
                {short_term_plan}
            </div>
        )
    }

    /**
     * @note
     * this.props.long_term_plan_count is passed from LongTermPlan, we want to make sure
     * that the this.props.long_term_plan_count already updated before we use it to query
     * the data from database
     * Also, if(this.props.long_term_plan_count !== prevProps.long_term_plan_count) is used
     * to avoid infinitely calling the componentDidUpdate function because each when we update
     * the state, we will re-render the component
     */
    /**
     * @note
     *  Get request happens asynchronously, it doesn't finish immediately,
     *  it needs some time to go to the server and get the data. However,
     *  Javascript executes the code in a synchronous manner, so after get
     *  request, the next line exectued immediately.
     *  If we don't want to block the application, we are supposed to use
     *  .then() instead of "const data = axios.get("...")"
     */
    componentDidUpdate(prevProps) {
        if (this.props.long_term_plan_count !== prevProps.long_term_plan_count){
            axios.get("short-term-plan.json")
            .then(response => {
                if(response.data != null) {
                    const cur_long_term_plan = `long-term-plan-${this.props.long_term_plan_count}`
                    let cur_count = 0

                    const short_term_plans = response.data[cur_long_term_plan]
                    for(let count in short_term_plans) {
                        cur_count = Math.max(cur_count, count)
                    }

                    const cur_short_term_plan = short_term_plans[cur_count]
                    for (let prop in cur_short_term_plan) {
                        this.setState({title:cur_short_term_plan[prop].title})
                        this.setState({new: false})
                    }
                }
            })
        }
    }

    /* ========== Methods ========== */
    /* Handle input change of the short_term_plan_title */
    inputChangeHandler1 = (event) => {
        let short_term_plan_title = this.state.title
        short_term_plan_title = event.target.value
        this.setState({ short_term_plan_title })
    }
    /* Handle input change of the short_term_plan */
    inputChangeHandler2 = (event) => {
        let short_term_plan = { ...this.state.short_term_plan }
        short_term_plan.title = event.target.value
        this.setState({ short_term_plan })
    }
    inputChangeHandler3 = (event) => {
        let short_term_plan = { ...this.state.short_term_plan }
        short_term_plan.comment = event.target.value
        this.setState({ short_term_plan })
    }

    /* Start a new ShortTermPlan and add a title for it */
    postPlanHandler = (event) => {
        /* Post new added short_term_plan data to database */
        axios.post(`/short-term-plan/long-term-plan-${this.props.long_term_plan_count}/${this.state.count}.json`, this.state.short_term_plan)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        /* Update short_term_plans and show new added short_term_plan */
        let short_term_plans = this.state.short_term_plans
        this.setState({ short_term_plans })
        this.setState({ new: false })
    }

    refreshPlanHandler = () => {
        this.setState({ new: true });
    }

    postSubPlanHandler = (event, index) => {
        let data = { ...this.state.short_term_plans[index] }
        console.log(data)
        axios.put(`/short-term-plan/${this.state.count}-${this.state.title}/${this.state.props[index]}.json`, data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        event.preventDefault()
    }
}

export default ShortTermPlan