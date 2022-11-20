import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {createDispatcherRequest} from "../../../store/actions/usersActions";
import DispatcherModal from "./DispatcherModal";

const NewDispatcher = ({modal, modalHandler}) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.createError);
  const loading = useSelector(state => state.users.createLoading);

  const [dispatcherData, setDispatcherData] = useState({
    email: "",
    password: "",
    role: "",
    displayName: "",
    avatar:  ""
  });

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
    modalHandler(!modal);
  };


  return (
    <div>
      <DispatcherModal
        modal={modal}
        dispatcher={dispatcherData}
        modalHandler={modalHandler}
        submitFormHandler={submitFormHandler}
        inputHandler={inputChangeHandler}
        getFieldError={getFieldError}
        fileHandler={fileChangeHandler}
        loading={loading}
        buttonName="Create"
      />
    </div>
  );
};

NewDispatcher.propTypes = {
  modal: PropTypes.bool.isRequired,
  modalHandler: PropTypes.func.isRequired
};

export default NewDispatcher;