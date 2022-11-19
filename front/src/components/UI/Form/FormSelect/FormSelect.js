import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {FormHelperText, Grid} from '@mui/material';

const FormSelect = ({array, value, onChange, label, required, name, variant, error, driver}) => {
  return (
    <Grid item xs={12}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth error={Boolean(error)}>
          <InputLabel required={required} id="demo-simple-select-label">{label}</InputLabel>
          <Select
            sx={{textAlign: 'left'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            name={name}
            onChange={onChange}
            required={required}
          >
            {array.map((item, index) => {
              if (variant === 'array') {
                return <MenuItem key={index} value={item}>{item}</MenuItem>
              }
              if (variant === 'object') {
                return <MenuItem key={item._id} value={item._id}>{driver ? item.name : item.title}</MenuItem>
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

export default FormSelect