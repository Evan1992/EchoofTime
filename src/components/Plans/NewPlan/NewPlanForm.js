/* ========== import React and React hooks ========== */
import React from 'react';

/* ========== import corresponding css ========== */
import classes from './NewPlanForm.module.css'

const NewPlanForm = (props) => {
    return(
        <form className={classes.control}>
            <input type="text" value={props.title} onChange={(event) => props.inputChange(event)} />
            <button onClick={props.postPlan}>Add</button>
            <button onClick={props.cancelPlan}>Cancel</button>
        </form>
    )
}

export default NewPlanForm