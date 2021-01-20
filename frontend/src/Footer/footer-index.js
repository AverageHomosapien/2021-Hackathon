import React, { Component } from "react";
import LabelBottomNavigation from './Bottom-Nav'



class Footer extends Component {
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
                    <LabelBottomNavigation/>
                </div>
            </React.Fragment>
        );
    }
}

export default Footer;