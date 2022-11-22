import React from 'react';
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MenuBtn = ({trip, sendTrip, cancelTripHandler, editTripHandler, attachFileHandler, leaveCommentHandler, viewAllHandler, user}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {trip.status === 'finished' && user.role === 'user' ? null : <MenuItem onClick={() => [editTripHandler(trip._id), handleClose()]}>Edit</MenuItem>}
        {trip.status === 'upcoming' && <MenuItem onClick={() => [sendTrip(trip._id), handleClose()]}>Send</MenuItem>}
        {trip.status === 'transit' && <MenuItem onClick={() => [sendTrip(trip._id), handleClose()]}>Close</MenuItem>}
        {trip.status !== 'finished' && trip.status !== 'cancel'
          ? <MenuItem onClick={() => [cancelTripHandler(trip._id), handleClose()]}>Cancel</MenuItem>
          : <div>
              <MenuItem onClick={() => [attachFileHandler(trip._id), handleClose()]}>Attach</MenuItem>
              <MenuItem onClick={() => [leaveCommentHandler(trip._id), handleClose()]}>Leave a comment</MenuItem>
              <MenuItem onClick={() => [viewAllHandler(trip._id), handleClose()]}>View all</MenuItem>
            </div>
        }
      </Menu>
    </div>
  );
};

export default MenuBtn;