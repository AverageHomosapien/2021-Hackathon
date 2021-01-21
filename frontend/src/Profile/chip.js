import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    paddingTop: "5%" ,
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    color: "secondary" 
  },
}));

export default function ChipsArray() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Coding' },
    { key: 1, label: 'Yoga' },
    { key: 2, label: 'Meditation' },
    { key: 4, label: 'Chess' },
    { key: 5, label: 'French' },
    { key: 6, label: 'German' },
    { key: 7, label: 'Painting' },
    { key: 8, label: 'Singing' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        let icon;

        return (
          <li key={data.key}>
            <Chip
              color="secondary"
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}