import React from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const FormSelect = ({name, label, value, onChange, error, required, options, optionItem, variant}) => {
    return (
        <Grid item textAlign="left">
            <FormControl fullWidth error={Boolean(error)}>
                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${name}-label`}
                    fullWidth
                    onChange={onChange}
                    name={name}
                    label={label}
                    value={value}
                    required={required}
                    variant={variant}
                >
                    {options.map(option => (
                        <MenuItem key={option._id} value={option._id}>{option[optionItem]}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </Grid>
    );
};

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    optionItem: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool,
    variant: PropTypes.string,
};

export default FormSelect;