import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {createDispatcherRequest} from "../../../store/actions/usersActions";
import DispatcherModal from "./DispatcherModal";
import AddButton from "../../UI/Button/AddButton/AddButton";

const NewDispatcher = ({dispatcherRole}) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.createError);
  const loading = useSelector(state => state.users.createLoading);

  const [openCreate, setOpenCreate] = useState(false);

  const [dispatcherData, setDispatcherData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: dispatcherRole,
    displayName: "",
    avatar:  ""
  });

  useEffect(() => {
    if (error === null) {
      setOpenCreate(false);
      setDispatcherData({
        email: "",
        phoneNumber: "",
        password: "",
        role: dispatcherRole,
        displayName: "",
        avatar:  ""
      });
    }
  }, [error, dispatcherRole])

  const modalCloseHandler = () => {
    setOpenCreate(false);
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
    if (e.target) {
      const {name, value} = e.target;
      setDispatcherData(prev => ({...prev, [name]: value}));
    } else {
      setDispatcherData(prev => ({...prev, phoneNumber: e.replace(/ /g, '')}))
    }
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
  };

  return (
    <div>
      <AddButton click={() => setOpenCreate(!openCreate)}/>
      <DispatcherModal
        title="New Dispatcher"
        modal={openCreate}
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
  dispatcherRole: PropTypes.string.isRequired
};

export default NewDispatcher;