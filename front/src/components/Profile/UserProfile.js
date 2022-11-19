import React from 'react';
import InnerContainer from "../InnerContainer/InnerContainer";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

const UserProfile = () => {
  return (
    <InnerContainer>
      <Grid item sx={{paddingLeft: "15px"}}>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          My Profile (user)
        </Typography>
      </Grid>

    </InnerContainer>
  );
};

export default UserProfile;