import React from 'react';
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";

const RadioInputs = ({radioSelectors, handleChange, label, value, def}) => {
  return (
    <FormControl sx={{width: "100%"}}>
      <FormLabel id="radio-buttons-group-label" sx={{textAlign: "left"}}>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="radio-buttons-group-label"
        name="role"
        onChange={handleChange}
        value={value}
        defaultValue={def}
      >

        {radioSelectors.map(selector => (
          <FormControlLabel value={selector.value} control={<Radio />} label={selector.label} key={selector.id} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

RadioInputs.propTypes = {
  radioSelectors: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  def: PropTypes.string.isRequired
};

export default RadioInputs;