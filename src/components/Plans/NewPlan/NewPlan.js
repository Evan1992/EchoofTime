/* ========== import React and React hooks ========== */
import React, { Component } from 'react'

/* ========== import react components ========== */
import NewPlanForm from './NewPlanForm'

/* ========== import corresponding css ========== */
import classes from './NewPlan.module.css'


class NewPlan extends Component {
    state = {
        show_form: false
    }
    
    /* ========== Lifecycle ========== */
    render() {
        if (this.state.show_form) {
            return (
                <NewPlanForm
                    form_toggler={this.formToggleHandler}
                    parent=""
                    rank={0}
                    g_state={this.props.g_state}
                />
            );
        } else {
            return (
                <div className={classes.hint} onClick={this.formToggleHandler}>Click here to add task</div>
            );
        }

    }

    /* ========== Methods ========== */
    formToggleHandler = () => {
        this.setState({show_form: !this.state.show_form})
    }
}


export default NewPlan