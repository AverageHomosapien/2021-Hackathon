import React, {Component, Fragment} from "react";
import SimpleTabs from "./Custom-Tabs"
import axios from '../Axios'

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


    render() {
        return (
            <React.Fragment>
                <div style={{paddingTop: "5%"}}>
                    <SimpleTabs interestArray={this.state.data}/>
                </div>
            </React.Fragment>
        )
    }
}


export default Home