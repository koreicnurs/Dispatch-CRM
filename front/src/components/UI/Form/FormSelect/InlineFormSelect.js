import React from 'react';
import {FormControl, MenuItem, Select} from "@mui/material";

const InlineFormSelect = ({options, name, value, onchange, def, title, id}) => {
  return (
    <FormControl size="small">
      <Select
        fullWidth
        name={name}
        value={value}
        onChange={onchange}
        defaultValue={def}
        id={id}
        sx={{fontSize: "12px", paddingY: "0px"}}
      >
        {options.map(option => (
          <MenuItem
            key={option._id}
            value={option._id}
          >
            {option[`${title}`]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default InlineFormSelect;