import React from 'react';
import {FormControlLabel, Switch} from "@mui/material";
import PropTypes from "prop-types";

const SwitchForm = ({checked, handleChange, id, name, label}) => {
  return (
    <FormControlLabel
      control={
      <Switch checked={checked} onChange={handleChange} id={id} name={name} />
      }
      label={label}
    />
  );
};

SwitchForm.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default SwitchForm;