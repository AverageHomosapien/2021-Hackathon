import React, {Component, Fragment} from "react";
import SimpleTabs from "./Custom-Tabs"

class Home extends Component {
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