/* ========== import react components ========== */
import React, { Component } from 'react';
import {secondsToHHMMSS} from '../Utils/Utils'

/* ========== import corresponding css ========== */
// import classes from './Timer.module.css'

class Timer extends Component {
 
    state = {
        seconds:this.props.seconds? this.props.seconds:0
    }
    
    interval = null
    
    componentDidMount(){
        this.props.plan_component.timer = this;
    }
    
    componentWillReceiveProps(nextProps) {
      if (nextProps.seconds !== this.state.seconds) {
        this.setState({seconds: nextProps.seconds});
      }
    }
    
    render(){
        return(
            <div>
                {secondsToHHMMSS(this.state.seconds)}
            </div>
        )
    }
    
    tick(){
        this.setState({seconds:this.state.seconds+1})
    }
    
    reset_timer(){
        console.log(`Timer reset`)
        if (this.interval) {
            clearInterval(this.interval)
        }
        this.setState({seconds:0})
    }
    
    pause_timer(){
        console.log(`Timer paused`)
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
    
    set_seconds(n){
        this.setState({seconds:n})
    }
    
    get_seconds(){
        return this.state.seconds;
    }
    
    start_timer(){
        console.log(`Timer started`)
        this.interval = setInterval(() => this.tick(), 1000)
    }
    
}

export default Timer