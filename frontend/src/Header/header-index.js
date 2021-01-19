import React, { Component } from "react";
import SimpleTabs from "./Home-Tabs"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import MenuAppBar from './Menu-extend'



class Header extends Component {

    state = {
        activeTab: 0,
        navBarRouting: false
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        /* Depending on the route -- We're switching  */
        switch (nextProps.location.pathname) {
            // case "/home":
            //     return {
            //         activeTab: 0,
            //         navBarRouting: true
            //     };

            default:
                return {
                    activeTab: 0,
                    navBarRouting: true
                }
        }
    };


    handleChange = (newValue) => {
        if (this.state.activeTab === newValue) {
            return;
        }
        this.setState({ activeTab: newValue });
        this.setState({ navBarRouting: true })
    };

    getStyles = () => {
        return {
            flexGrow: 1,
            backgroundColor: "#1F1F1F"
        }
    }


    /* Passing through handleChnage function into the centeredtabs properties, so we can invoke the function from within that other component */
    render() {
        return (
            <Paper style={this.getStyles()}>
                <SimpleTabs handleChange={this.handleChange} />
            </Paper>
        );
    }
}

export default Header;