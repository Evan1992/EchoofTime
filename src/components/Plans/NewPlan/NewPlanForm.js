/* ========== import React and React hooks ========== */
import React, { useRef } from 'react';

/* ========== import other libraries ========== */
import axios from '../../../axios'

/* ========== import corresponding css ========== */
import classes from './NewPlanForm.module.css'

const NewPlanForm = (props) => {
    /**
     * @note
     * useRef() hook will help avoid the redundant calls to setState() and re-render the page for every keystroke
     */
    const input_plan = useRef();
    
    /* ========== Methods ========== */
    const postPlanHandler = () => {
        const target = {
            complete: false,
            title: input_plan.current.value,
            comment: "",
            rank: props.rank? props.rank:0,
            parent: props.parent? props.parent:"",
            children: {},
            seconds: 0
        }

        axios.post(`/plans.json`, target)
        .then(response => {
            console.log(response)
            
            axios.put(`/active_plans/${response.data.name}.json`, true)
            .then(response =>{
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            
            // update parent's children
            if (props.parent)  axios.put(`/plans/${props.parent}/children/${response.data.name}.json`, true)
            .then(response =>{
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return(
        <form className={classes.control}>
            <input type="text" ref={input_plan} />
            <button onClick={postPlanHandler}>Add</button>
            <button onClick={props.form_toggler}>Cancel</button>
        </form>
    )
    

}

export default NewPlanForm