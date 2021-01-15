import axios from '../../axios'
import React, { Component} from 'react'

class NewTask extends Component {
    state = {
        date: null,
        title: ''
    }

    /* ========== Methods ========== */
    postDataHandler = () =>{
        const data = {
            date: new Date().getDate(),
            title: this.state.title
        }
        axios.post("/task.json", data)
            .then(response =>{
                console.log(response)
            })
    }

    render() {
        return (
            <div>
                <h2>Add a new task</h2>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <button onClick={this.postDataHandler}>Add</button>
            </div>
        )
    }
}

export default NewTask