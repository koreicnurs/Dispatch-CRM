import React from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import PropTypes from "prop-types";

const PasswordInput = ({show, inputHandler, error, value, name, label, showHandler, id}) => {
  return (
    <>
      <FormControl variant="outlined" sx={{width: "100%"}}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
          fullWidth
          id={id}
          type={show ? "text" : "password"}
          name={name}
          label={label}
          value={value}
          onChange={inputHandler}
          error={Boolean(error)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={showHandler}
                onMouseDown={showHandler}
                edge="end"
              >
                {show ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

PasswordInput.propsType = {
  show: PropTypes.bool.isRequired,
  inputHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showHandler: PropTypes.func.isRequired
};

export default PasswordInput;