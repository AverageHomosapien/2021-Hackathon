import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(5),
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
  },
}));

export default function LetterAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar> <h1>JM</h1> </Avatar>
    </div>
  );
}
