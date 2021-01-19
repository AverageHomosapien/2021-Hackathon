import React, {Component, Fragment} from "react";
import SimpleTabs from "./Custom-Tabs"
import DataTable from './Datagrid'
import axios from '../Axios'

class Home extends Component {

    /* Working example of data being consumed from PYTHON API */
    componentDidMount() {
        axios.PYTHON_API.getUsers()
            .then( response => {
                console.log(response);   
            })
    }


    render() {
        return (
            <React.Fragment>
                <div style={{paddingTop: "5%"}}>
                    <SimpleTabs />
                </div>
            </React.Fragment>
        )
    }
}


export default Home