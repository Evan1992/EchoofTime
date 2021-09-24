/* ========== import React and React hooks ========== */
import React, { Component } from 'react'

/* ========== import other libraries ========== */
import axios from '../../../axios'

/* ========== import react components ========== */
import NewPlanForm from './NewPlanForm'

/* ========== import corresponding css ========== */
import classes from './NewPlan.module.css'


class NewPlan extends Component {
    state = {
        show_form: false,
        title: ""
    }



    /* ========== Lifecycle ========== */
    render() {
        if (this.state.show_form) {
            return (
                <NewPlanForm 
                    show_from={this.state.show_form}
                    title={this.state.title} 
                    inputChange={this.inputChangeHandler}
                    postPlan={this.postPlanHandler}
                    cancelPlan={this.cancelPlanHandler}
                />
            );
        } else {
            return (
                <div className={classes.hint} onClick={this.showFormHandler}>Click here to add task</div>
            );
        }

    }

    /* ========== Methods ========== */
    showFormHandler = () => {
        this.setState({show_form:true})
    }

    cancelPlanHandler = () => {
        this.setState({show_form:false})
    }

    inputChangeHandler = (event) => {
        this.setState({title: event.target.value})
    }

    postPlanHandler = () => {
        const target = {
            complete: false,
            title: this.state.title,
            comment: "",
            rank: 0,
            parent: "",
            children: {},
            seconds: 0
        }

        axios.post(`/plans.json`, target)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        
        this.setState({show_form:false})
    }
}


export default NewPlan