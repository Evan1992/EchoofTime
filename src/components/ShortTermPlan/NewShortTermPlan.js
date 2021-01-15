import React, { Component } from 'react'
import axios from '../../../axios'


class NewShortTermPlan extends Component {
    state = {
        title: ''
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
        axios.get("/new-short-term-plan.json")
            .then(response => {
                console.log(response)
            })
    }
    postDataHandler = () => {
        const data = {
            title: this.state.title
        }
        axios.post("/new-short-term-plan.json", data)
            .then(response => {
                console.log(response)
            })
    }
    
    render () {
        let short_term_plan = null
        if(this.props.show_short_term_plan_form){
            short_term_plan = (
                <div className="NewShortTermPlan">
                    <h1>Add a new short term plan</h1>
                    <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                    <button onClick={this.postDataHandler}>Add</button>
                </div>
            )    
        }

        return (
            <div>
                {short_term_plan}
            </div>
        )
    }
}

export default NewShortTermPlan
