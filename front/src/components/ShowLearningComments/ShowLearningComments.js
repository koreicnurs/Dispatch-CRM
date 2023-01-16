import React from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const ShowLearningComments = ({author, text, role, datetime}) => {
  return (
    <Grid container sx={{background: 'white'}} mt={2} >
      <Grid item fontSize='12px' xs={2}>
        <Typography variant="p" color="text.secondary">
          <b>{author}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          role: {role}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(datetime).toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        {text}
      </Grid>
    </Grid>
  );
};

export default ShowLearningComments;