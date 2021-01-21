import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(-2),
      paddingLeft: '0%', 
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  },
}));

export default function LetterAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar> <img src="https://avatarfiles.alphacoders.com/186/thumb-186033.jpg" /> </Avatar>
    </div>
  );
}
