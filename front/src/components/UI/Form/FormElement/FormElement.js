import React from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from "@mui/material";

const FormElement = ({name, value, onChange, label, error, type, required, inputProps, multiline, rows, className}) => {
    return (
        <Grid item xs={12} >
                <TextField
                    type={type}
                    required={required}
                    label={label}
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={error}
                    autoComplete={name}
                    inputProps={inputProps}
                    multiline={multiline}
                    rows={rows}
                    className={className}
                />
        </Grid>
    );
};

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    inputProps: PropTypes.object,
    multiline: PropTypes.bool,
    rows: PropTypes.number
};

export default FormElement;