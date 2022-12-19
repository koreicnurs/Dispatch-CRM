import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {createDispatcherRequest, createUserCarrierRequest} from "../../../store/actions/usersActions";
import DispatcherModal from "./DispatcherModal";
import AddButton from "../../UI/Button/AddButton/AddButton";
import {fetchCarriersRequest} from "../../../store/actions/carriersActions";

const NewDispatcher = ({dispatcherRole, title}) => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.createError);
  const loading = useSelector(state => state.users.createLoading);
  const carriers = useSelector(state => state.carriers.carriers);

  const [openCreate, setOpenCreate] = useState(false);

  const [dispatcherData, setDispatcherData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: dispatcherRole,
    displayName: "",
    avatar:  ""
  });

  const [userCarrierData, setUserCarrierData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: dispatcherRole,
    companyId: "",
    displayName: "",
    avatar: ""
  });

  useEffect(() => {
    if (error === null) {
      setOpenCreate(false);
      dispatch(fetchCarriersRequest());

      switch (dispatcherRole) {
        case "carrier":
          setUserCarrierData({
            email: "",
            phoneNumber: "",
            password: "",
            role: dispatcherRole,
            companyId: "",
            displayName: "",
            avatar: ""
          });
          break;
        default:
          return setDispatcherData({
            email: "",
            phoneNumber: "",
            password: "",
            role: dispatcherRole,
            displayName: "",
            avatar:  ""
          });
      }
    }
  }, [error, dispatcherRole, dispatch])

  const modalCloseHandler = () => {
    setOpenCreate(false);

    switch (dispatcherRole) {
      case "user":
        setDispatcherData({
          email: "",
          phoneNumber: "",
          password: "",
          role: dispatcherRole,
          displayName: "",
          avatar:  ""
        });
        break;

      case "admin":
        setDispatcherData({
          email: "",
          phoneNumber: "",
          password: "",
          role: dispatcherRole,
          displayName: "",
          avatar:  ""
        });
        break;

      case "carrier":
        setUserCarrierData({
          email: "",
          phoneNumber: "",
          password: "",
          role: dispatcherRole,
          companyId: "",
          displayName: "",
          avatar: ""
        });
        break;
      default:
        return null;
    }
  };

  const inputChangeHandler = e => {
    if (e.target) {
      const {name, value} = e.target;

      switch (dispatcherRole) {
        case "user":
          setDispatcherData(prev => ({...prev, [name]: value}));
          break;
        case "admin":
          setDispatcherData(prev => ({...prev, [name]: value}));
          break;
        case "carrier":
          setUserCarrierData(prev => ({...prev, [name]: value}));
          break;
        default:
          return null;
      }
    } else {
      switch (dispatcherRole) {
        case "user":
          setDispatcherData(prev => ({...prev, phoneNumber: e.replace(/ /g, '')}));
          break;
        case "admin":
          setDispatcherData(prev => ({...prev, phoneNumber: e.replace(/ /g, '')}));
          break;
        case "carrier":
          setUserCarrierData(prev => ({...prev, phoneNumber: e.replace(/ /g, '')}));
          break;
        default:
          return null;
      }
    }
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    switch (dispatcherRole) {
      case "user":
        setDispatcherData(prev => ({...prev, [name]: file}));
        break;
      case "admin":
        setDispatcherData(prev => ({...prev, [name]: file}));
        break;
      case "carrier":
        setUserCarrierData(prev => ({...prev, [name]: file}));
        break;
      default:
        return null;
    }
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

    switch (dispatcherRole) {
      case "user":
        Object.keys(dispatcherData).forEach(key => {
          formData.append(key, dispatcherData[key]);
        });
        await dispatch(createDispatcherRequest(formData));
        break;

      case "admin":
        Object.keys(dispatcherData).forEach(key => {
          formData.append(key, dispatcherData[key]);
        });
        await dispatch(createDispatcherRequest(formData));
        break;

      case "carrier":
        Object.keys(userCarrierData).forEach(key => {
          formData.append(key, userCarrierData[key]);
        });
        await dispatch(createUserCarrierRequest(formData));
        break;

      default:
        return null;
    }

    modalCloseHandler();
  };

  return (
    <div>
      <AddButton click={() => setOpenCreate(!openCreate)}/>
      <DispatcherModal
        title={title}
        modal={openCreate}
        dispatcher={dispatcherRole === "user" || "admin" ? dispatcherData : userCarrierData}
        modalHandler={modalCloseHandler}
        submitFormHandler={submitFormHandler}
        inputHandler={inputChangeHandler}
        getFieldError={getFieldError}
        fileHandler={fileChangeHandler}
        loading={loading}
        buttonName="Create"
        required={true}
        role={dispatcherRole}
        carriers={carriers}
      />
    </div>
  );
};

NewDispatcher.propTypes = {
  dispatcherRole: PropTypes.string.isRequired
};

export default NewDispatcher;