import React from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from "@mui/material";

const FormElement = ({name, value, onChange, label, error, type, required, inputProps, multiline, rows, className, variant, disabled, maxRows}) => {
    return (
        <Grid item xs={12} >
                <TextField
                    type={type}
                    required={required}
                    disabled={disabled}
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
                    maxRows={maxRows}
                    className={className}
                    variant={variant}
                />
        </Grid>
    );
};

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool,
    inputProps: PropTypes.object,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    variant: PropTypes.string
};

export default FormElement;