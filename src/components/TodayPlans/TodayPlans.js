import React, { Component } from 'react'
import axios from '../../axios'
import TodayPlan from './TodayPlan/TodayPlan'
import classes from './TodayPlans.module.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class TodayPlans extends Component {
    /* Old Syntax */
    constructor(props){
        super(props)
        this.state = {
            today_year:  new Date().getFullYear(),
            today_month: new Date().getMonth()+1,
            today_date:  new Date().getDate(),
            short_term_plans: [],
            today_plan:{
                show_today_plan: false,
                short_term_plan: '',
                sub_plan:    '',
                tasks: [],
                description: '',
                h: 0,
                m: 0,
                s: 0
            },
            total_h:0,
            total_m:0,
            total_s:0,
            today_plans: [],
            props: [],
            task: '',
            end: false
        }
    }

    /* New Syntax */
    // state = {
    //     today_date: new Date().gettoday_date(),
    //     short_term_plans: [],
    //     today_plan:{
    //         show_today_plan: false,
    //         short_term_plan: '',
    //         description: '',
    //         h: 0,
    //         m: 0,
    //         s: 0
    //     },
    //     total_h:0,
    //     total_m:0,
    //     total_s:0,
    //     today_plans: []
    // }

    componentDidMount() {
        axios.get('/short-term-plan.json')
            .then(response => {
                if(response.data != null){
                    const last = Object.keys(response.data).length-1
                    let short_term_plans = []
                    for(let prop in response.data[last]){
                        short_term_plans.push(response.data[last][prop])
                    }
                    this.setState({short_term_plans})
                }
            })
            /* handle error */
            .catch(error =>{
                console.log(error)
            })
        
        axios.get(`/today-plan/${this.state.today_date}-${this.state.today_month}-${this.state.today_year}.json`)
            .then(response => {
                if(response.data != null){
                    let today_plans = []
                    let props       = []
                    for(let prop in response.data){
                        props.push(prop)
                        today_plans.push(response.data[prop])
                    }
                    this.setState({props})
                    this.setState({today_plans})
                }
        })
        /* handle error*/
        .catch(error =>{
            console.log(error)
        })
    }

    render(){
        let today_plans = null
        const options1 = []
        const options2 = []
        this.state.short_term_plans.forEach(plan =>{
            console.log(plan)
            options1.push(plan.title)
            if("sub_plans" in plan){
                plan.sub_plans.forEach(sub_plan =>{
                    if(!(options2.includes(sub_plan.title))){
                        options2.push(sub_plan.title)
                    }    
                })
            }
            console.log(options1, options2)
        })
        const selectedOption1 = this.state.today_plan.short_term_plan
        const selectedOption2 = this.state.today_plan.sub_plan
        
        today_plans = (
            <div className={classes.today_plans}>
                <div className={classes.today_plans_title}>
                    Today's Plan({this.state.today_month}/{this.state.today_date}/{this.state.today_year})
                    <button onClick={this.endTodayPlanHandler}>End</button>
                </div>
                {/* Show exsiting plans of today */}
                {this.state.today_plans.map((today_plan, index) =>{
                    return (
                        <TodayPlan key={index}
                            short_term_plan = {today_plan.short_term_plan}
                            sub_plan        = {today_plan.sub_plan}
                            tasks           = {today_plan.tasks}
                            description     = {today_plan.description}
                            show_today_plan = {today_plan.show_today_plan}
                            h               = {today_plan.h}
                            m               = {today_plan.m}
                            s               = {today_plan.s}
                            expand          = {() => this.expandCollapseHandler(index)}
                            start           = {() => this.startTimerHandler(index)}
                            stop            = {() => this.stopTimerHandler(index)}
                            finish          = {(event) => this.finishTaskHandler(event, index)}
                            input_change    = {(event) => this.inputChangeHandler2(event, index)}
                            add_task        = {(event) => this.addTaskHandler(event, index)}
                        />
                    )
                })}

                {/* Show form to add a new plan for today */}
                <div>
                    <h4>Add a new plan for today</h4>
                    <form onSubmit={(event) => this.postDataHandler(event)}>
                        <Dropdown options={options1}  onChange={this._onSelect1} value={selectedOption1} placeholder="Select an option" />
                        <Dropdown options={options2}  onChange={this._onSelect2} value={selectedOption2} placeholder="Select an option" />
                        <input type="text" onChange={this.inputChangeHandler1} />
                        <input type="submit" value="Add" />
                    </form>    
                </div>
            </div>
        )
        
        return( 
            <div>
                {today_plans}
            </div>
        )
    }

    /* ========== Methods ========== */
    
    /**
     * 
     * @note
     *  
     */
    startTimerHandler = (index) =>{
        this.myInterval = setInterval(() =>{this.runTimerHandler(index)}, 1000)
    }

    runTimerHandler = (index) =>{    
        const today_plans = this.state.today_plans
        today_plans[index].s++
        if(today_plans[index].m === 60){
            today_plans[index].h++
            today_plans[index].m = 0
        }
        if(today_plans[index].s === 60){
            today_plans[index].m++
            today_plans[index].s = 0
        }
        this.setState({today_plans})
    }

    stopTimerHandler = (index) =>{
        clearInterval(this.myInterval)
    }

    _onSelect1 = (selectedOption) =>{
        let today_plan = {...this.state.today_plan}
        today_plan.short_term_plan = selectedOption.value
        this.setState({today_plan})
    }

    _onSelect2 = (selectedOption) =>{
        let today_plan = {...this.state.today_plan}
        today_plan.sub_plan = selectedOption.value
        this.setState({today_plan})
    }

    /* Handle the input change of new today_plan*/
    inputChangeHandler1 = (event) =>{
        let today_plan = {...this.state.today_plan}
        today_plan.description = event.target.value
        this.setState({today_plan})   
    }
    /* Handle the input change of new temporary task */
    inputChangeHandler2 = (event, index) =>{
        let task = this.state.task
        task = event.target.value
        this.setState({task})
        let today_plans = this.state.today_plans
        if(!('tasks' in today_plans[index])){
            today_plans[index].tasks = []
        }
    }

    postDataHandler = (event) =>{
        /* Post new added today_plan data to database */
        console.log(this.state.today_plan);
        axios.post(`/today-plan/${this.state.today_date}-${this.state.today_month}-${this.state.today_year}.json`, this.state.today_plan)
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
        /* Update today_plans and show new added today_plan*/
        let today_plans = this.state.today_plans
        today_plans.push(this.state.today_plan)
        this.setState({today_plans})
        event.preventDefault()
    }
    addTaskHandler = (event, index) =>{
        let today_plans = this.state.today_plans
        if(!('tasks' in today_plans[index])){
            today_plans[index].tasks = []
        }
        today_plans[index].tasks.push(this.state.task)
        this.setState({today_plans})
    }
    finishTaskHandler = (event, index) =>{
        let today_plans = this.state.today_plans
        let task_index = event.target.value
        today_plans[index].tasks.splice(task_index, 1)
        this.setState({today_plans})
    }

    expandCollapseHandler = (index) =>{
        const today_plans = this.state.today_plans
        today_plans[index].show_today_plan = !today_plans[index].show_today_plan
        this.setState({today_plans})
    }

    endTodayPlanHandler = () =>{

    }
}

export default TodayPlans