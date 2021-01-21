import React, { Component } from "react";
import PrimarySearchAppBar from "./Menu-extend"



class Header extends Component {

    render() {
        return (
            <React.Fragment>
                <div>
                    <PrimarySearchAppBar/>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;