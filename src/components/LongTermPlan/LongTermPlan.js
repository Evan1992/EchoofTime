/**
 * @brief Stateful component to manage the logic of long_term_plan module
 */
import React, { Component } from 'react'
import axios from '../../axios'
import classes from './LongTermPlan.module.css'

class LongTermPlan extends Component {
    /* ========== State =========== */
    state = {
        exsit: false,
        professions: [
            {
                title: '',
                description: ''
            }
        ],
        interests: [
            {
                title: '',
                description: ''
            }
        ],
        entertainments: [
            {
                title: '',
                description: ''
            }
        ]
    }

    /* ========== Lifecycle ========== */
    componentDidMount(){
        axios.get("/long-term-plan.json")
          .then(response =>{
              if(response.data != null){
                  let fetchData = null
                  for(let prop in response.data){
                      fetchData = response.data[prop]
                  }
                  this.setState({
                    exsit: fetchData.exsit,
                    professions: fetchData.professions,
                    interests: fetchData.interests,
                    entertainments: fetchData.entertainments
                  })
              }
          })
      }

    /* ========== Methods ========== */
    inputChangeHandler = (event, identifier, index, data, isTitle) =>{
        let newData = data
        if(isTitle){
            newData[index].title = event.target.value
            
        }else{
            newData[index].description = event.target.value
        }

        switch(identifier){
            case('professions'):
                this.setState({professions: newData})
                break
            case('interests'):
                this.setState({interests: newData})
                break
            case('entertainments'):
                this.setState({entertainments: newData})
                break
            default:
                break
        }
    }

    /**
     * 
     * @note 
     *  The form element submits when clicking either the <input type="submit" value="submit">
     *  or <button>submit</button>
     *  event.preventDefault() stop the form from automatically reloading the page
     *  when add a new row
     * 
     * @note
     *  By default, button element is the type "submit" which causes it to submit the
     *  enclosing form element. Changing the type to "button" prevents that. 
     */
    postDataHandler = () =>{
        this.setState({exsit: !this.state.exsit}, ()=>{
            axios.post("/long-term-plan.json", this.state)
            .then(response =>{
                // console.log(response)
            }) 
        })    
    }

    addNewPlanHandler = (event, identifier, data) =>{
        let newData = data
        newData.push({
            title: '',
            description: ''
        })
        switch(identifier){
            case('professions'):
                this.setState({professions: newData})
                break
            case('interests'):
                this.setState({interests: newData})
                break
            case('entertainments'):
                this.setState({entertainments: newData})
                break
            default:
                break
        }
        console.log(this.state.professions)
        
    }

    render() {
        let long_term_plan = null
        if(this.state.exsit){
            // Show current long_term_plan
            long_term_plan = (
                <div>
                    <div className={classes.long_term_plan_title}>Long Term Plan</div>
                    <h2>Professions</h2>
                    {this.state.professions.map((profession, index) =>{
                        return(
                            <div key={index}> 
                                <div>{profession.title}</div>
                                <div>{profession.description}</div>
                            </div>
                        )   
                    })}

                    <h2>Interests</h2>
                    {this.state.interests.map((interest, index) =>{
                        return(
                            <div key={index}> 
                                <div>{interest.title}</div>
                                <div>{interest.description}</div>
                            </div>
                        )   
                    })}

                    <h2>Entertainments</h2>
                    {this.state.entertainments.map((entertainment, index) =>{
                        return(
                            <div key={index}> 
                                <div>{entertainment.title}</div>
                                <div>{entertainment.description}</div>
                            </div>
                        )   
                    })}

                </div>
            )
        }else{
            // Show new long_term_plan form
            long_term_plan = (
                <div>
                    <div className={classes.long_term_plan_title}>Start a new long term plan</div>
                    <div className={classes.long_term_plan_content}>
                        <form onSubmit={this.postDataHandler}>
                            <h2>Professions</h2>
                            {this.state.professions.map((profession, index) =>{
                                return(
                                    <div key={index}>
                                        <input type="text" name="professions" placeholder="Profession"  onChange={(event) => this.inputChangeHandler(event, 'professions', index, this.state.professions, true)}  />
                                        <input type="text" name="professions" placeholder="Description" onChange={(event) => this.inputChangeHandler(event, 'professions', index, this.state.professions, false)} />
                                        <button type="button" onClick={(event) => this.addNewPlanHandler(event, "professions", this.state.professions)}>Add a new one</button>
                                    </div>
                                ) 
                            })}
                            
                            <h2>Interests</h2>
                            {this.state.interests.map((interest, index) =>{
                                return(
                                    <div key={index}>
                                        <input type="text" placeholder="Interest"    onChange={(event) => this.inputChangeHandler(event, 'interests', index, this.state.interests, true)} />
                                        <input type="text" placeholder="Description" onChange={(event) => this.inputChangeHandler(event, 'interests', index, this.state.interests, false)} />
                                        <button type="button" onClick={(event) => this.addNewPlanHandler(event, "interests", this.state.interests)}>Add a new one</button>
                                    </div>
                                )    
                            })}
                            
                            <h2>Entertainments</h2>
                            {this.state.entertainments.map((entertainment, index) =>{
                                return(
                                    <div key={index}>
                                        <input type="text" placeholder="Entertainment" onChange={(event) => this.inputChangeHandler(event, 'entertainments', index, this.state.entertainments, true)}  />
                                        <input type="text" placeholder="Description"   onChange={(event) => this.inputChangeHandler(event, 'entertainments', index, this.state.entertainments, false)} />
                                        <button type="button" onClick={(event) => this.addNewPlanHandler(event, "entertainments", this.state.entertainments)}>Add a new one</button>
                                    </div>
                                )   
                            })}
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            )
        }

        return(
            <div className={classes.long_term_plan}>{long_term_plan}</div>
        )
    }
}

export default LongTermPlan
