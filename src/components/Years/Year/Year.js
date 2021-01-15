import React from 'react'

const year = (props) => {
    return (
        <div>
            <div>{props.year}</div>
            <button onClick={props.click}>Expand</button>
            {
                props.showPlans === true?
                <div>
                    <p>{props.short_term_plans[0]}</p>
                    <p>{props.short_term_plans[1]}</p>
                </div>:null
            }
            
        </div>
    )
}

export default year