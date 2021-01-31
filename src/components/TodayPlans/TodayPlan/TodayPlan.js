import React from 'react'

const todayPlan = (props) =>{
    let today_plan = null
    if(props.show_today_plan){
        today_plan = (
            <div>
                <div>
                    {props.h}:{props.m}:{props.s}
                </div>
                <button onClick={props.start}>Start</button>
                <button onClick={props.stop}>Stop</button>
                {
                    props.tasks !== undefined ? 
                    <div>
                    {props.tasks.map((task, index) =>{
                        return(
                            <div key={index}>
                                <div>{task}</div>
                                {/* 
                                    Two-way binding 
                                        value={index} is used for passing value to parent
                                */}
                                <button onClick={props.finish} value={index}>Finish</button>
                            </div>
                        )
                    })}
                    </div>:null
                }
                
                <div>
                    <input type="text" onChange={props.input_change} />
                    <button onClick={props.add_task}>Add</button>
                </div>
                {/* <form onSubmit={props.add_task}>
                    <label>New Task:
                        <input type="text" onChange={props.input_change} />
                        <input type="submit" value="Add" />
                    </label>  
                </form> */}
            </div>
        )
    }

    return(
        <div>
            <div>
                <button onClick={props.expand}>Expand</button>
                {props.short_term_plan} --- {props.sub_plan} --- {props.description}
            </div>
            {today_plan}
        </div>
    )
}


export default todayPlan