import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
import {addCommentRequest, fetchTripRequest} from "../../store/actions/tripsActions";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  maxHeight: 600,
  overflow: "auto",
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px'
};



const NewComment = ({open, handleClose, id}) => {
  const dispatch = useDispatch();
  const trip = useSelector(state => state.trips.trip);
  const [comment, setComment] = useState('');

  const inputChangeHandler = e => {
    setComment(e.target.value);
  };


  useEffect(() => {
    if (id) {
      dispatch(fetchTripRequest(id));
    }
  }, [dispatch, id]);


  useEffect(() => {
    if (trip && trip.comment) {
      setComment(trip.comment);
    }
  }, [trip]);


  const sendComment = () => {
    dispatch(addCommentRequest({comment, id}));
    handleClose();
    setComment('');
  };

  return (
    <div>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >

          <Box sx={style}>
            <Typography id="keep-mounted-modal-description" sx={{ mb: 2 }}>
              Comment
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              value={comment}
              rows={4}
              onChange={inputChangeHandler}
            />
            <Grid container justifyContent={'space-between'} spacing={1} my={'10px'}>
              <Grid item xs={6}>
                <ButtonWithProgress
                  fullWidth
                  type="button"
                  variant="contained"
                  onClick={sendComment}
                >
                  Save
                </ButtonWithProgress>
              </Grid>
              <Grid item xs={6}>
                <ButtonWithProgress
                  fullWidth
                  type="button"
                  variant="contained"
                  onClick={() => [handleClose(), setComment('')]}
                >
                  Cancel
                </ButtonWithProgress>
              </Grid>
            </Grid>
          </Box>



        </Modal>
      </div>

    </div>
  );
};

export default NewComment;