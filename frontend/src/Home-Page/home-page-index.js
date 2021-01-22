import React, {Component, Fragment} from "react";
import SimpleTabs from "./Custom-Tabs"
import axios from '../Axios'
import {
    Route
  } from "react-router-dom";

import banner from '../Static/banner.png'


class Home extends Component {

    state = {
        data: null
    }

    /* Working example of data being consumed from PYTHON API */
    componentDidMount() {
        axios.PYTHON_API.getInterests()
            .then( response => {
                this.setState({
                    data: response.data
                })
            })
    }

    getStyles = () => {
        return {
            marginRight: 'auto',
            height: "150px",
            display: 'block',
            textAlign: 'left'
        }
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    <Route path="/home">
                    <div  style={{backgroundColor: "#1C1C1C"}}>
                        <img style={this.getStyles()} src={banner} alt="Logo" />
                    </div>
                        <SimpleTabs interestArray={this.state.data}/>
                    </Route>
                </div>
            </React.Fragment>
        )
    }
}


export default Home