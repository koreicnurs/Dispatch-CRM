import React, {useEffect, useState} from 'react';
import {Alert, Box, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {editCarrierRequest, fetchCarriersRequest} from "../../store/actions/carriersActions";
import {makeStyles} from "tss-react/mui";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '20px'
};

const useStyles = makeStyles()(() => ({
    field: {
        background: "white"
    }
}));

const EditCarrier = ({open, handleClose, carrier}) => {
    const {classes} = useStyles();

    const dispatch = useDispatch();
    const error = useSelector(state => state.carriers.error);
    const loading = useSelector(state => state.carriers.loading);

    const [carrierData, setCarrierData] = useState({
        title: '',
        mc: '',
        dot: '',
        fedid: '',
        description: ''
    });

    useEffect(() => {
        setCarrierData(carrier);
    }, [carrier]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setCarrierData(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(editCarrierRequest({id: carrier._id, data: {...carrierData}}));

        setCarrierData({
            title: '',
            mc: '',
            dot: '',
            fedid: '',
            description: ''
        });
        await dispatch(fetchCarriersRequest());
        handleClose();
    };

    const getFieldError = fieldName => {
        try {
            return `${error.error} ${[fieldName]}`;
        } catch {
            return undefined;
        }
    };

    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {carrier ?
                    <>
                        <Typography id="keep-mounted-modal-description" sx={{ mb: 2 }}>
                            Edit Carrier
                        </Typography>
                        <Grid
                            container
                            direction="column"
                        >
                            <Grid item>
                                {error && (
                                    <Alert severity="error">
                                        Error! {error.message}
                                    </Alert>
                                )}
                            </Grid>

                            {carrierData && <Grid
                                component="form"
                                container
                                onSubmit={submitFormHandler}
                                textAlign="center"
                                spacing={1}
                            >
                                <FormElement
                                    onChange={inputChangeHandler}
                                    name="title"
                                    label="Company name"
                                    value={carrierData.title}
                                    required={true}
                                    error={getFieldError('title')}
                                    className={classes.field}
                                />

                                <FormElement
                                    onChange={inputChangeHandler}
                                    name="mc"
                                    label="MC"
                                    value={carrierData.mc}
                                    required={true}
                                    error={getFieldError('mc')}
                                    className={classes.field}
                                />

                                <FormElement
                                    onChange={inputChangeHandler}
                                    name="dot"
                                    label="DOT"
                                    value={carrierData.dot}
                                    required={true}
                                    error={getFieldError('dot')}
                                    className={classes.field}
                                />

                                <FormElement
                                    onChange={inputChangeHandler}
                                    name="fedid"
                                    label="FED-ID"
                                    value={carrierData.fedid}
                                    required={true}
                                    error={getFieldError('fedid')}
                                    className={classes.field}
                                />

                                <FormElement
                                    onChange={inputChangeHandler}
                                    name="description"
                                    label="Description"
                                    value={carrierData.description}
                                    multiline={true}
                                    rows={3}
                                    error={getFieldError('description')}
                                    className={classes.field}
                                />

                                <Grid item xs={12}>
                                    <ButtonWithProgress
                                        loading={loading}
                                        disabled={loading}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                    >
                                        Save changes
                                    </ButtonWithProgress>
                                </Grid>

                            </Grid> }
                        </Grid>
                    </>
                    : <h4>Please choose a carrier to edit!</h4> }
                </Box>
            </Modal>
        </div>
    );
};

export default EditCarrier;