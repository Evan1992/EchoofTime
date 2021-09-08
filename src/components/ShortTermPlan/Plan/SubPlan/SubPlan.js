/**
 * @brief functional component
 */
import React from 'react'
import classes from './SubPlan.module.css'

import commentLogo from '../../../../assets/images/icon_comment.png'

const SubPlan = (props) =>{
    let sub_plans = null
    let sub_plan_form = null
    if(props.show_subPlans){
        sub_plans = (
            <div>
                {props.sub_plans.map((plan, index) =>{
                    return(
                        <ul key={index}>
                            <div>{plan.title}<img src={commentLogo} alt="" /></div>
                        </ul>
                    )
                })}
            </div>
        )
    }
    if(props.show_subPlan_form){
        sub_plan_form = (
            <form onSubmit={props.post_subPlan}>
                <div className={classes.wrapper}>
                    <div className={classes.column1}>Sub Plan</div>
                    <input type="text" onChange={props.input_change1} className={classes.column2} required/>

                    <div className={classes.column3}>Comment</div>
                    <textarea onChange={props.input_change2} className={classes.column4} />

                    <div className={classes.column5}>
                        <input type="submit" value="Add" />
                        <button type="button" onClick={props.cancel_subPlan_form}>Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
    return(
        <div>
            {/* Show exsiting sub_plan */}
            {sub_plans}
            {/* Add a new sub_plan */}
            {sub_plan_form}
        </div>
    )

    // let short_term_plan_sub_plans = null
    // let sub_plan_form = null
    // if(props.sub_plans !== undefined){
    //     short_term_plan_sub_plans = (
    //         <div>
    //             {props.sub_plans.map((plan, index) =>{
    //                 return(
    //                     <div key={index}>
    //                         {plan.title}---{plan.description}
    //                     </div>
    //                 )    
    //             })}     
    //         </div>
    //     )
    // }
    // if(props.show_subPlan_form){
    //     sub_plan_form = (
    //         <form onSubmit={props.post_sub_plan}>
    //             <div className={classes.wrapper}>
    //                 <div className={classes.column1}>Sub Plan</div>
    //                 <input type="text" onChange={props.input_change3} className={classes.column2} required/>

    //                 <div className={classes.column3}>Comment</div>
    //                 <textarea onChange={props.input_change4} className={classes.column4} />

    //                 <div className={classes.column5}>
    //                     <input type="submit" value="Add" />
    //                     <button type="button" onClick={props.cancel_sub_plan}>Cancel</button>
    //                 </div>
    //             </div>
    //         </form>
    //     )
        
    // }
}

export default SubPlan