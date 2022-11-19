import React from 'react';
import InnerContainer from "../InnerContainer/InnerContainer";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import Profile from "./Profile";
import PropTypes from "prop-types";

const UserProfile = ({user, error}) => {
  return (
    <InnerContainer>
      <Grid item sx={{paddingLeft: "15px"}}>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          My Profile (user)
        </Typography>
      </Grid>

      <Grid item>
        <Profile user={user} error={error}/>
      </Grid>

    </InnerContainer>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfile;