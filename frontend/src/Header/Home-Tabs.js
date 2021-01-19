import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#000000"
    },
    indicator: {
        backgroundColor: "#FFFFFF"
    },
    label: {
        color: "#FFFFFF",
    },
}));

export default function CenteredTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.handleChange(newValue)
    };

    return (
        <React.Fragment style={{flexGrow: 1}}>
            <Tabs
                value={value}
                classes={{ indicator: classes.indicator }}
                onChange={handleChange}
                centered
            >
                <Tab className={classes.label} icon={<HomeIcon/>} label="Home" component={Link} to="/home" index={0} />
                <Tab className={classes.label} label="Profile" icon={<PersonPinIcon />} component={Link} to="/profile" index={1} />
            </Tabs>
        </React.Fragment>
    );
}