import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {changeDispatcherRequest} from "../../../store/actions/usersActions";
import DispatcherModal from "./DispatcherModal";

const EditDispatcher = ({modal, modalHandler, dispatcher}) => {
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
    modalHandler(!modal);
  };

  return (
    <div>
      {dispatcher &&
        <DispatcherModal
          modal={modal}
          dispatcher={dispatcherData}
          modalHandler={modalHandler}
          submitFormHandler={submitFormHandler}
          inputHandler={inputChangeHandler}
          getFieldError={getFieldError}
          fileHandler={fileChangeHandler}
          loading={loading}
          buttonName="Change"
        />
      }


    </div>
  );
};

EditDispatcher.propTypes = {
  modal: PropTypes.bool.isRequired,
  modalHandler: PropTypes.func.isRequired
}

export default EditDispatcher;