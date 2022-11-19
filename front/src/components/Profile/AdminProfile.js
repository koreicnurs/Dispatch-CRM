import React from 'react';
import InnerContainer from "../InnerContainer/InnerContainer";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import Profile from "./Profile";
import PropTypes from "prop-types";

const AdminProfile = ({user, error}) => {
  return (
    <InnerContainer>
      <Grid item sx={{paddingLeft: "15px"}}>
        <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
          My Profile (admin)
        </Typography>
      </Grid>

      <Grid item>
        <Profile user={user} error={error}/>
      </Grid>

    </InnerContainer>
  );
};

AdminProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminProfile;