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
    var input_plan = useRef();
    
    /* ========== Methods ========== */
    const postPlanHandler = () => {
        const target = {
            complete: false,
            active: true,
            title: input_plan.current.value,
            comment: "",
            rank: props.rank? props.rank:0,
            parent: props.parent? props.parent:"",
            children: {},
            date: "",
            seconds: 0,
        }
        
        props.g_state.plans_element.addNewPlan(target);
        // axios.post(`/plans.json`, target)
        // .then(response => {
        //     console.log(response)
        //     const new_id = response.data.name
            
        //     props.g_state.plans[new_id]=target
            
        //     // update parent's children
        //     if (props.parent)  {
        //     const parent_plan = props.g_state.plans[props.parent]
        //     if (!parent_plan.children) parent_plan.children={}
        //     parent_plan.children[new_id]=true
            
        //     axios.put(`/plans/${props.parent}/children/${response.data.name}.json`, true)
        //     .then(response =>{
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        //     }
        //     props.g_state.plans_element.updateTrigger()
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        props.form_toggler()
    }
    
    return(
        <div className={classes.control}>
            <input type="text" ref={input_plan} />
            <button onClick={postPlanHandler}>Add</button>
            <button onClick={props.form_toggler}>Cancel</button>
        </div>
    )
    

}

export default NewPlanForm