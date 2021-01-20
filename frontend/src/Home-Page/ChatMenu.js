import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChatButton from './Custom-Button'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function NestedGrid(props) {
  const classes = useStyles();

  const breakIntoParts = (num, parts) => 
        [...Array(parts)].map((_,i) => 
          0|(i < num%parts ? num/parts+1 : num/parts))

  const partionArrayIntoThree = (index) => {
    if (!props.dataArray) {
        return []
    }

    const arrayBreakdown = breakIntoParts(props.dataArray.interests.length,3)

    if (index === 0) {
        return props.dataArray.interests.slice(0, arrayBreakdown[index]);
    } else if (index === 1) {
        const startingIndex = arrayBreakdown[index - 1];
        return props.dataArray.interests.slice(startingIndex, (arrayBreakdown[index] + startingIndex)); 
    }else if (index === 2) {
        const startingIndex = arrayBreakdown[index - 2] + arrayBreakdown[index - 1];
        return props.dataArray.interests.slice(startingIndex, (arrayBreakdown[index] + startingIndex)); 
    }
  }

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={2}>
            <ChatButton style={{flexWrap : 'wrap'}} dataArray={partionArrayIntoThree(0)}/>
        </Grid>
        <Grid item xs={2}>
            <ChatButton style={{flexWrap : 'wrap'}} dataArray={partionArrayIntoThree(1)}/>
        </Grid>
        <Grid item xs={2}>
            <ChatButton style={{flexWrap : 'wrap'}} dataArray={partionArrayIntoThree(2)}/>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container  spacing={1}>
        <Grid container item xs={10} spacing={1}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
