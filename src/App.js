/** 
 *
 */

import React, { Component } from 'react'
import './App.css'
import Year from './components/Years/Year/Year'
import LongTermPlan  from  './components/LongTermPlan/LongTermPlan'
import ShortTermPlan from  './components/ShortTermPlan/ShortTermPlan'
import TodayPlan     from  './components/TodayPlan/TodayPlan'
// import axios from './axios'

class App extends Component{
  /* ========== State =========== */
  state = {
    years : [
      {
        id: '1', 
        year: "2019",
        short_term_plans: ["Fall Semester", "Winter Break"],
        showPlans: false
      },
      {
        id: '2', 
        year: "2020",
        short_term_plans: [],
        showPlans: false
      },
      {
        id: '3', 
        year: "2021",
        short_term_plans: [],
        showPlans: false
      }
    ]
  }

  /* ========== Lifecycle ========== */


  /* ========== Methods ========== */
  showPlansHanlder = (index) => {
    const years = this.state.years
    years[index].showPlans = !years[index].showPlans
    this.setState({years: years})
  }

  render() {

    return (
      <div>
        <div><LongTermPlan /></div>

        <div>
          {/**
            * @brief Outputting lists    
            * @Function
            *   Map: the map() function creates a new array populated with
            *        the results of calling a provided function on every
            *        element in the calling array
            */}
          {this.state.years.map((year, index) => {
            return <Year
            key={year.id} 
            year={year.year}
            short_term_plans = {year.short_term_plans}
            showPlans = {year.showPlans}
            click={() => this.showPlansHanlder(index)}  // Inside click is a Anonymous function
            />
          })}
        </div>

        <div><ShortTermPlan /></div>
        <div><TodayPlan /></div>

      </div>
    )
  }
}

export default App;
