import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NestedGrid from './ChatMenu'
import Fade from "@material-ui/core/Fade";

function TabPanel(props) {
  const {children, value, index, classes, ...other} = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
          {value === index && (
              <Container disableGutters maxWidth={false}>
                  <Box>
                      {children}
                  </Box>
              </Container>
          )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  
  const [value, setValue] = React.useState(0);
  const [showNestedGrid, setGridVisibility] = React.useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      handleGridChange(!showNestedGrid);
    }
  };

  const handleGridChange = (value, topic) => {
    setGridVisibility(value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: "#000000"}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Chats" {...a11yProps(0)} />
          <Tab label="Resources" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel style={{backgroundColor: "WHITE"}} value={value} index={0}>
        { props.interestArray &&
          <Fade in={showNestedGrid}>
            <NestedGrid dataArray={props.interestArray} changeHandler={handleGridChange}/>
          </Fade>
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        Resources
      </TabPanel>
    </div>
  );
}