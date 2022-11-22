import React, {useState} from 'react';
import {Box, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "tss-react/mui";
import FormElement from "../../UI/Form/FormElement/FormElement";
import RadioInputs from "../../UI/Form/RadioInputs/RadioInputs";
import PasswordInput from "../../UI/Form/PasswordInput/PasswordInput";
import FileInput from "../../UI/Form/FileInput/FileInput";
import ButtonWithProgress from "../../UI/Button/ButtonWithProgress/ButtonWithProgress";

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

const useStyles = makeStyles()(() => ({
  field: {
    background: "white"
  }
}));

const radioSelectors = [{label: "User", id: 1, value: "user"}, {label: "Admin", id: 2, value: "admin"}];

const DispatcherModal = ({modal, title, dispatcher, modalHandler, submitFormHandler, inputHandler, getFieldError, fileHandler, loading, buttonName, required}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Modal
        keepMounted
        open={modal}
        onClose={modalHandler}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-description" sx={{ mb: 2 }}>
            {title}
          </Typography>

          <Grid
            component="form"
            container
            onSubmit={submitFormHandler}
            textAlign="center"
            spacing={1}
          >
            <FormElement
              disabled={dispatcher.role === "admin" && true}
              onChange={inputHandler}
              type="email"
              name="email"
              label="Email"
              value={dispatcher.email}
              required={true}
              error={getFieldError('email')}
              className={classes.field}
            />

            <FormElement
              onChange={inputHandler}
              name="displayName"
              label="Name"
              value={dispatcher.displayName}
              required={true}
              error={getFieldError('displayName')}
              className={classes.field}
            />

            <Grid item xs={12}>
              <RadioInputs
                radioSelectors={radioSelectors}
                handleChange={inputHandler}
                label="Role"
                value={dispatcher.role}
                def={dispatcher.role}
              />
            </Grid>

            <Grid item xs={12} >
              <PasswordInput
                label="Password"
                name="password"
                value={dispatcher.password}
                show={showPassword}
                showHandler={() => setShowPassword(!showPassword)}
                inputHandler={inputHandler}
                getError={getFieldError("password")}
                required={required}
              />
            </Grid>

            <Grid item xs={12}>
              <FileInput
                onChange={fileHandler}
                label="Avatar"
                name="avatar"
              />
            </Grid>

            <Grid item xs={12} container spacing={1} justifyContent="space-between">

              <Grid item xs={6}>
                <ButtonWithProgress
                  loading={loading}
                  disabled={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  {buttonName}
                </ButtonWithProgress>
              </Grid>

              <Grid item xs={6}>
                <ButtonWithProgress
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={modalHandler}
                >
                  Cancel
                </ButtonWithProgress>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

DispatcherModal.propsType = {
  modal: PropTypes.bool.isRequired,
  dispatcher: PropTypes.object.isRequired,
  modalHandler: PropTypes.func.isRequired,
  submitFormHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  fileHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonName: PropTypes.string.isRequired
}

export default DispatcherModal;