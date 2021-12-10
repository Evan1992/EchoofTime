/* ========== import React and React hooks ========== */
import React, { Component } from 'react'

/* ========== import react components ========== */
import NewPlanForm from './NewPlanForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                <Container fluid>
                    <Row>
                        <Col xs={1}></Col>
                        <Col xs="auto"><div className={classes.placeholder}></div></Col>
                        <Col xs={{ span: 5}} style={{display:'flex', justifyContent:'left'}}>
                            <NewPlanForm
                                form_toggler={this.formToggleHandler}
                                parent={this.props.root_id}
                                rank={this.props.rank}
                                g_state={this.props.g_state}
                            />
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container fluid>
                    <Row>
                        <Col xs={1}></Col>
                        <Col xs="auto"><div className={classes.placeholder}></div></Col>
                        <Col xs={{ span: 3}} style={{display:'flex', justifyContent:'left'}}>
                            <div className={classes.hint} onClick={this.formToggleHandler}>Click here to add a task</div>
                        </Col>
                    </Row>
                </Container>
            );
        }

    }

    /* ========== Methods ========== */
    formToggleHandler = () => {
        this.setState({show_form: !this.state.show_form})
    }
}


export default NewPlan