import React, { Component } from "react";
import PrimarySearchAppBar from "./Menu-extend"



class Header extends Component {
    getStyles = () => {
        return {
            flexGrow: 1,
            backgroundColor: "#1f1f1f",
        }
    }

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