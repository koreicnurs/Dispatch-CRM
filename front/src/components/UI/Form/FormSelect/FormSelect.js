import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {FormHelperText, Grid, ListItemText} from '@mui/material';
import {Checkbox} from "antd";

const FormSelect = ({array, value, onChange, label, required, name, variant, error, driver, multiple, disabled, height, isNew, edit}) => {


  return (
    <Grid item xs={12}>
      <Box sx={{ minWidth: 50 }}>
        <FormControl fullWidth error={Boolean(error)}>
          {!multiple &&
            <InputLabel required={required} id="demo-simple-select-label">{label}</InputLabel>
          }
          <Select
            displayEmpty
            sx={{textAlign: 'left', height: {height}}}
            labelId={multiple ? null : "demo-simple-select-label"}
            id="demo-simple-select"
            multiple={multiple}
            value={value}
            label={label ? label : null}
            name={name}
            onChange={onChange}
            required={required}
            disabled={disabled}
          >
            {array.map((item, index) => {
              if (variant === 'array') {
                if (multiple) {
                  return <MenuItem key={index} value={item}>
                            <Checkbox checked={value.indexOf(item) > -1} />
                            <ListItemText primary={item} sx={{paddingLeft: "5px"}}/>
                          </MenuItem>
                } else {
                  return <MenuItem key={index} value={item} disabled={name === 'status' && item !== 'ready' && item !== 'off'}>{item}</MenuItem>
                }
              }
              if (variant === 'object') {
                return <MenuItem
                  key={item._id}
                  value={item._id}
                  name={name}
                  disabled={(isNew !== undefined && edit !== undefined) && ((!edit && !isNew) || ((isNew && item.status !== 'in transit' && item.status !== 'ready') || (item.status === 'off' || item.status === 'in tr/upc' || item.status === 'upcoming')))}
                >
                  {driver ? item.name : item.title}
                </MenuItem>
              }
              return null;
            })}
          </Select>
          <FormHelperText>{ error }</FormHelperText>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default FormSelect;
