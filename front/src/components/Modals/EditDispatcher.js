import React, {useEffect, useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {changeDispatcherRequest, fetchUsersRequest} from "../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import RadioInputs from "../UI/Form/RadioInputs/RadioInputs";
import PasswordInput from "../UI/Form/PasswordInput/PasswordInput";
import FileInput from "../UI/Form/FileInput/FileInput";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
import PropTypes from "prop-types";

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

const EditDispatcher = ({modal, modalHandler, dispatcher}) => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.changeError);
  const loading = useSelector(state => state.users.changeLoading);

  const [dispatcherData, setDispatcherData] = useState({
    _id: "",
    email: "",
    password: "",
    role: "",
    displayName: "",
    avatar:  ""
  });

  useEffect(() => {
    setDispatcherData({
      id: dispatcher._id,
      email: dispatcher.email,
      password: "",
      role: dispatcher.role,
      displayName: dispatcher.displayName,
      avatar: dispatcher.avatar
    })
  }, [dispatcher]);

  const inputChangeHandler = e => {
    const {name, value} = e.target;
    setDispatcherData(prev => ({...prev, [name]: value}));
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setDispatcherData(prev => ({...prev, [name]: file}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = async e => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(dispatcherData).forEach(key => {
      formData.append(key, dispatcherData[key]);
    });
    await dispatch(changeDispatcherRequest(formData));
    await dispatch(fetchUsersRequest());
    modalHandler(!modal);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {dispatcher &&
        <Modal
          keepMounted
          open={modal}
          onClose={modalHandler}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography id="keep-mounted-modal-description" sx={{ mb: 2 }}>
              Edit Dispatcher data
            </Typography>

            <Grid
              component="form"
              container
              onSubmit={submitFormHandler}
              textAlign="center"
              spacing={1}
            >
              <FormElement
                onChange={inputChangeHandler}
                type="email"
                name="email"
                label="Email"
                value={dispatcherData.email}
                required={true}
                error={getFieldError('email')}
                className={classes.field}
              />

              <FormElement
                onChange={inputChangeHandler}
                name="displayName"
                label="Name"
                value={dispatcherData.displayName}
                required={true}
                error={getFieldError('displayName')}
                className={classes.field}
              />

              <Grid item xs={12}>
                <RadioInputs
                  radioSelectors={radioSelectors}
                  handleChange={inputChangeHandler}
                  label="Role"
                  value={dispatcherData.role}
                  def={dispatcherData.role}
                />
              </Grid>

              <Grid item xs={12} >
                <PasswordInput
                  label="Password"
                  name="password"
                  show={showPassword}
                  showHandler={() => setShowPassword(!showPassword)}
                  inputHandler={inputChangeHandler}
                  getError={getFieldError("name")}
                />
              </Grid>

              <Grid item xs={12}>
                <FileInput
                  onChange={fileChangeHandler}
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
                    Create
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
      }


    </div>
  );
};

EditDispatcher.propTypes = {
  modal: PropTypes.bool.isRequired,
  modalHandler: PropTypes.func.isRequired
}

export default EditDispatcher;