import React from 'react';
import {Autocomplete, TextField} from "@mui/material";

const AutocompleteSelect = ({value, onChange, options, placeholder}) => {
  return (
    <Autocomplete
      multiple
      id="autocomplete"
      value={value}
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => option.label ?? option}
      style={{ width: 250 }}
      renderInput={(params) => (
        <TextField {...params} label={placeholder} placeholder={placeholder} />
      )}
    />
  );
};

export default AutocompleteSelect;