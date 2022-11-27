import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {createDispatcherRequest} from "../../../store/actions/usersActions";
import DispatcherModal from "./DispatcherModal";

const NewDispatcher = ({modal, modalHandler, dispatcherRole}) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.createError);
  const loading = useSelector(state => state.users.createLoading);

  const [dispatcherData, setDispatcherData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: dispatcherRole,
    displayName: "",
    avatar:  ""
  });

  const modalCloseHandler = () => {
    modalHandler(!modal);
    setDispatcherData({
      email: "",
      phoneNumber: "",
      password: "",
      role: dispatcherRole,
      displayName: "",
      avatar:  ""
    });
  };

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
    await dispatch(createDispatcherRequest(formData));

    if (error === null) {
      modalCloseHandler();
    }
  };


  return (
    <div>
      <DispatcherModal
        title="New Dispatcher"
        modal={modal}
        dispatcher={dispatcherData}
        modalHandler={modalCloseHandler}
        submitFormHandler={submitFormHandler}
        inputHandler={inputChangeHandler}
        getFieldError={getFieldError}
        fileHandler={fileChangeHandler}
        loading={loading}
        buttonName="Create"
        required={true}
      />
    </div>
  );
};

NewDispatcher.propTypes = {
  modal: PropTypes.bool.isRequired,
  modalHandler: PropTypes.func.isRequired,
  dispatcherRole: PropTypes.string.isRequired
};

export default NewDispatcher;