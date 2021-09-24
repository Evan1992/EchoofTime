import axios from 'axios'
import React, { Component } from 'react'

class Plan extends Component {

    /* ========== Lifecycle ========== */
    componentDidMount() {
        axios.get(`/active_plans.json`)
        .then(response => {
            if(response.data != null) {
                console.log(response)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {

    }
}                                                                                                                                                                                                                     

export default Plan