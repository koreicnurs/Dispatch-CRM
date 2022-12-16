import React from 'react';
import {makeStyles} from 'tss-react/mui';
import {Grid} from '@mui/material';

const useStyles = makeStyles()(() => ({
  messageBlock: {
    padding: '2px 5px',
    margin: '8px 15px',
    textAlign: 'left',
    border: '1px solid #314694',
    borderRadius: '4px'
  },
  user: {
    marginLeft: 'auto',
    fontSize: 14,
    textDecoration: 'underline'
  },
  message: {
    display: 'inline-block',
    whiteSpace: 'wrap',
    overflow: 'hidden',
    paddingRight: '15px',
  },
  commentsBox: {
    overflowY: 'scroll',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px'
  },
  descriptionLegend: {
    padding: '0 10px',
    marginRight: 'auto'
  },
}));

const TripsComments = ({commentArray, user}) => {
  const { classes } = useStyles();
  
  return (
    commentArray.length !== 0 ?
      <Grid component={'fieldset'} item xs={12} my={'10px'} maxHeight={250} className={classes.commentsBox}>
        <legend className={classes.descriptionLegend}>Description</legend>
        {commentArray.map((item, index) => (
          <div
            key={index}
            style={user._id === item.authorId._id ? {backgroundColor: '#314694', color: 'white'} : {backgroundColor: 'white', color: '#314694'}}
            className={classes.messageBlock}
          >
          <div className={classes.user}>
        {item.authorId.displayName}
          </div>
          <span className={classes.message}>{item.text}</span>
          </div>
        ))}
      </Grid> : null
  );
};

export default TripsComments;