import React, { Component } from 'react'
import axios from '../../axios'

class ShortTermPlan extends Component {
    state = {
        have_short_term_plan: false,
        title: '',
        today_plans: [
            {

            }
        ]
    }

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
                    let fetchData = null
                    for(let prop in response.data){
                        fetchData = response.data[prop]
                    }
                    this.setState({have_short_term_plan: true})
                    this.setState({title: fetchData.title})
                    
                }
            })
    }
    postDataHandler = () => {
        const data = {
            title: this.state.title
        }
        axios.post("/short-term-plan.json", data)
            .then(response => {
                console.log(response)
            })
    }
    
    render () {
        let short_term_plan = null
        if(this.state.have_short_term_plan){
            // Show current short_term_plan
            short_term_plan = (
                <div>
                    <h1>Short Term Plan</h1>
                    <div>{this.state.title}</div>
                </div>
            )
        }else{
            // Show new short_term_plan form
            short_term_plan = (
                <div className="NewShortTermPlan">
                    <h1>Add a new short term plan</h1>
                    <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                    <button onClick={this.postDataHandler}>Add</button>
                </div>
            ) 
        }

        return (
            <div>{short_term_plan}</div>
        )
    }
}

export default ShortTermPlan