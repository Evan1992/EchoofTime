import React, { Component } from 'react'
import axios from '../../axios'
import classes from './ShortTermPlans.module.css'
import ShortTermPlan from './ShortTermPlan/ShortTermPlan'
// import ShortTermPlanSubPlan from './ShortTermPlan/ShortTermPlanSubPlan/ShortTermPlanSubPlan'
import NewShortTermPlan from './NewShortTermPlan/NewShortTermPlan'

class ShortTermPlans extends Component {
    state = {
        new: true,
        count: 0,
        title: '',
        props: [],
        short_term_plans: [],
        short_term_plan: {
            title:     '',
            comment:   '',
            sub_plans: []
        }
    }

    /* ========== Lifecycle ========== */
    componentDidMount() {
        /**
         * Note
         *  Get request happens asynchronously, it doesn't finish immediately,
         *  it needs some time to go to the server and get the data. However,
         *  Javascript executes the code in a synchronous manner, so after get
         *  request, the next line exectued immediately.
         *  If we don't want to block the application, we are supposed to use
         *  .then() instead of "const data = axios.get("...")"
         */
        axios.get("/short-term-plan.json")
            .then(response => {
                if(response.data != null){
                    let last = 0
                    let title = ''
                    for(let prop in response.data){
                        const tmp_count = parseInt(prop.charAt(0), 10)
                        const tmp_title = prop.substring(2)
                        if(tmp_count >= last){
                            last  = tmp_count
                            title = tmp_title
                        }
                    }
                    this.setState({title})
                    this.setState({new: false})
                    this.setState({count: last})

                    let short_term_plans = []
                    axios.get(`/short-term-plan/${last}-${title}.json`)
                        .then(response =>{
                            let props = []
                            for(let prop in response.data){
                                props.push(prop)
                                short_term_plans.push(response.data[prop])
                            }
                            this.setState({props})
                            this.setState({short_term_plans})
                        })
                }
            })
    }
    
    render () {
        let short_term_plans = null
        if(this.state.new){
            short_term_plans = (
                <div>
                    <label htmlFor="short_term_plan_title">Title</label>
                    <input type="text" id="short_term_plan_title" onChange={(event) => this.inputChangeHandler1(event)} required />
                    <button onClick={this.postNewPlanHandler}>Start</button>  
                </div>
            )
        }else{
            short_term_plans = (
                <div>
                    <div className={classes.title}>{this.state.title}</div>
                    <ul>
                        {this.state.short_term_plans.map((plan, index) =>{
                            return (
                                <div key={index}>
                                    <ShortTermPlan 
                                        plan = {plan}
                                        addSubPlanHandler  = {() => this.addSubPlanHandler(index)}
                                        postSubPlanHandler = {(event) => this.postSubPlanHandler(event, index)}
                                    />
                                </div>
                            )
                        })}
                    </ul>
                </div>
            )
        }
        
        return (
            <div className={classes.short_term_plan}>
                <div className={classes.short_term_plan_title}>Short Term Plan<button>new</button></div>
                {short_term_plans}
                <NewShortTermPlan 
                    postPlanHandler     = {(event) => this.postPlanHandler(event)}
                    short_term_plan     = {this.state.short_term_plan}
                    inputChangeHandler1 = {this.inputChangeHandler2}
                    inputChangeHandler2 = {this.inputChangeHandler3}
                />
            </div>
        )
    }

    /* ========== Methods ========== */
    /* Handle input change of the short_term_plan_title */
    inputChangeHandler1 = (event) =>{
        let short_term_plan_title = this.state.title
        short_term_plan_title = event.target.value
        this.setState({title: short_term_plan_title})
    }
    /* Handle input change of the short_term_plan */
    inputChangeHandler2 = (event) =>{
        let short_term_plan = {...this.state.short_term_plan}
        short_term_plan.title = event.target.value
        this.setState({short_term_plan})
    }
    inputChangeHandler3 = (event) =>{
        let short_term_plan = {...this.state.short_term_plan}
        short_term_plan.comment = event.target.value
        this.setState({short_term_plan})
    }

    /* Handle adding a title for the ShortTermPlan */
    postNewPlanHandler = () =>{
        this.setState({new: false})
    }
    /* Handle adding new short_term_plan*/
    postPlanHandler = (event) => {
        /* Post new added short_term_plan data to database */
        axios.post(`/short-term-plan/${this.state.count}-${this.state.title}.json`, this.state.short_term_plan)
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
        /* Update short_term_plans and show new added short_term_plan */
        let short_term_plans = this.state.short_term_plans
        short_term_plans.push(this.state.short_term_plan)
        this.setState({short_term_plans})
        event.preventDefault()
    }

    postSubPlanHandler = (event, index) =>{
        let data = {...this.state.short_term_plans[index]}
        console.log(data)
        axios.put(`/short-term-plan/${this.state.count}-${this.state.title}/${this.state.props[index]}.json`, data)
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
        event.preventDefault()
    }
}

export default ShortTermPlans