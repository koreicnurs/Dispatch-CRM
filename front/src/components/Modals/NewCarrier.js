import React, {useState} from 'react';
import {Alert, Box, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {createCarrierRequest} from "../../store/actions/carriersActions";
import {makeStyles} from "tss-react/mui";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px'
};

const useStyles = makeStyles()(theme => ({
  field: {
    background: "white"
  }
}));

const NewCarrier = ({open, handleClose}) => {
  const {classes} = useStyles();

  const dispatch = useDispatch();
  const error = useSelector(state => state.carriers.error);
  const loading = useSelector(state => state.carriers.loading);

  const [carrier, setCarrier] = useState({
    title: '',
    mc: '',
    dot: '',
    fedid: '',
    description: ''
  });

  const inputChangeHandler = e => {
    const {name, value} = e.target;
    setCarrier(prev => ({...prev, [name]: value}));
  };

  const submitFormHandler = async e => {
    e.preventDefault();

    await dispatch(createCarrierRequest({...carrier}));

    setCarrier({
      title: '',
      mc: '',
      dot: '',
      fedid: '',
      description: ''
    });

    handleClose();
  };

  const getFieldError = fieldName => {
    try {
      return `${error.error} ${[fieldName]}`;
    } catch {
      return undefined;
    }
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
              New Carrier
            </Typography>

            <Grid
              container
              direction="column"
            >

              <Grid item>
                {error && (
                  <Alert severity="error">
                    Error! {error.message}
                  </Alert>
                )}
              </Grid>

              <Grid
                component="form"
                container
                onSubmit={submitFormHandler}
                textAlign="center"
                spacing={1}
              >
                <FormElement
                  onChange={inputChangeHandler}
                  name="title"
                  label="Company name"
                  value={carrier.title}
                  required={true}
                  error={getFieldError('title')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="mc"
                  label="MC"
                  value={carrier.mc}
                  required={true}
                  error={getFieldError('mc')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="dot"
                  label="DOT"
                  value={carrier.dot}
                  required={true}
                  error={getFieldError('dot')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="fedid"
                  label="FED-ID"
                  value={carrier.fedid}
                  required={true}
                  error={getFieldError('fedid')}
                  className={classes.field}
                />

                <FormElement
                  onChange={inputChangeHandler}
                  name="description"
                  label="Description"
                  value={carrier.description}
                  multiline={true}
                  rows={3}
                  error={getFieldError('description')}
                  className={classes.field}
                />

                <Grid item xs={12}>
                  <ButtonWithProgress
                    loading={loading}
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Create
                  </ButtonWithProgress>
                </Grid>

              </Grid>


            </Grid>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default NewCarrier;