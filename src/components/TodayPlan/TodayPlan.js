import axios from '../../axios'
import React, { Component } from 'react'
import Task from '../Task/Task'
import NewTask from '../Task/NewTask'

class TodayPlan extends Component {
    /* ========== State =========== */
    state = {
        date: new Date().getDate(),
        title: '',
        tasks: []
    }

    /* ========== Lifecycle ========== */
    componentDidMount() {
        axios.get('/task.json')
            .then(response => {
                if(response.data != null) {
                    let tmp_tasks = []
                    for(let prop in response.data){
                        if(response.data[prop].date === this.state.date){
                            tmp_tasks.push(response.data[prop])
                        }
                    }
                    this.setState({tasks: tmp_tasks})
                    console.log(this.state.tasks)
                }
            })
            /* handle error */
            .catch(error =>{
                console.log(error)
            })
    }

    render(){
        let tasks = null
        tasks = (
            <div>
                {/* Show exsiting tasks */}
                {this.state.tasks.map((task) =>{
                    return <Task
                        title={task.title}
                    />
                })}
            </div>    
        )
        
        return( 
            <div>
                <h1>Today's Plan</h1>
                {tasks}
                <NewTask />
            </div>
        )
    }
}

export default TodayPlan