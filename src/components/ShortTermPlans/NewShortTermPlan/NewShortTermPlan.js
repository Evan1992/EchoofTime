import React from 'react'
import classes from './NewShortTermPlan.module.css'

const newShortTermPlan = (props) =>{
    return(
        <div>
            {/* Add a new short_term_plan */}
            <div className={classes.title}>New Short Term Plan</div>
            <form onSubmit={props.postPlanHandler} >
                <div className={classes.wrapper}>
                    <div className={classes.column1}>Short Term Plan</div>
                    <input type="text" value={props.short_term_plan.title} onChange={props.inputChangeHandler1} className={classes.column2} required/>

                    <div className={classes.column3}>Comment</div>
                    <textarea value={props.short_term_plan.comment} onChange={props.inputChangeHandler2} className={classes.column4} />

                    <input type="submit" value="Add" className={classes.column5}/>
                </div>    
            </form>
        </div>
    )
}

export default newShortTermPlan