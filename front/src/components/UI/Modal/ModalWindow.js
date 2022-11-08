import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ModalWindow = (props) => {
  return (
    <div>
      <Button onClick={props.openCloseModal}>{props.name}</Button>
      <Modal
        sx={{
          '& .css-sox5kk-MuiBackdrop-root': {backgroundColor: 'rgb(25 44 110 / 30%)'},
          '& .css-1cfqeiw': {boxShadow: 'none', border: 'none'}
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.openCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            {props.children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;