import React, { Component } from 'react';

// import Plan from './Plan';
import NewPlan from '../Plans/NewPlan/NewPlan'

class Plans extends Component {
    state = {

    }

    /* ========== Lifecycle ========== */
    render() {
        return(
            <React.Fragment>
                {/* <Plan /> */}
                <NewPlan />
            </React.Fragment>
        )
    }

    /* ========== Methods ========== */
}

export default Plans