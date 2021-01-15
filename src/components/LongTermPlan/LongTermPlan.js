import React, { Component } from 'react'
import axios from '../../axios'

class LongTermPlan extends Component {
    /* ========== State =========== */
    state = {
        exsit: false,
        title: ''
    }

    /* ========== Lifecycle ========== */
    componentDidMount(){
        axios.get("/long-term-plan.json")
          .then(response =>{
              if(response.data != null){
                  let fetchData = null
                  for(let prop in response.data){
                      fetchData = response.data[prop]
                  }
                  this.setState({exsit: true})
                  this.setState({title: fetchData.title})
              }
          })
      }

    /* ========== Methods ========== */
    postDataHandler = () =>{
        const data = {
            title: this.state.title
        }
        axios.post("/long-term-plan.json", data)
            .then(response =>{
                console.log(response)
            })
    }

    render() {
        let long_term_plan = null
        if(this.state.exsit){
            // Show current long_term_plan
            long_term_plan = (
                <div>
                    <h1>Long Term Plan</h1>
                    <div>{this.state.title}</div>
                </div>
            )
        }else{
            // Show new long_term_plan form
            long_term_plan = (
                <div className="NewLongTermPlan">
                    <h1>Add a new long term plan</h1>
                    <label>
                        Title: <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}></input>
                        {/* Title: <input type="text" value={this.state.long_term_plan.title} onChange={(event) => this.setState({long_term_plan: {...this.state.long_term_plan, title: event.target.value}})} /> */}
                    </label>            
                    <button onClick={this.postDataHandler}>Add</button>
                </div>
            )
        }

        return(
            <div>{long_term_plan}</div>
        )
    }
}

export default LongTermPlan
