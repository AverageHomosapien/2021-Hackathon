import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const GreenSwitch = withStyles({
  switchBase: {
    color: "#4caf50",
    '&$checked': {
      color: "#4caf50",
    },
    '&$checked + $track': {
      backgroundColor: "#4caf50",
    },
  },
  checked: {},
  track: {},
})(Switch);

const OrangeSwitch = withStyles({
    switchBase: {
      color: "#ff9800",
      '&$checked': {
        color: "#ff9800",
      },
      '&$checked + $track': {
        backgroundColor: "#ff9800",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const RedSwitch = withStyles({
    switchBase: {
      color: "#f44336",
      '&$checked': {
        color: "#f44336",
      },
      '&$checked + $track': {
        backgroundColor: "#f44336",
      },
    },
    checked: {},
    track: {},
  })(Switch);

export default function CustomizedSwitches() {
    const [state, setState] = React.useState({
      checkedA: true,
      checkedB: false,
      checkedC: false,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
  
    return (
      <FormGroup>
        <FormControlLabel
          control={<GreenSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="Online"
        />
        <FormControlLabel
          control={<OrangeSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
          label="Busy"
        />
        <FormControlLabel
          control={<RedSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />}
          label="Offline"
        />
      </FormGroup>
    );
  }