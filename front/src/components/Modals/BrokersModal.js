import React, {useEffect, useState} from 'react';
import {Box, Fade, FormHelperText, Grid, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../UI/Form/FormElement/FormElement";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";
import EditButton from "../UI/Button/EditButton/EditButton";
import {
    clearBrokersErrors,
    createBrokerRequest,
    editBrokerRequest,
    fetchBrokersRequest
} from "../../store/actions/brokersActions";
import {MuiTelInput} from 'mui-tel-input';
import AddButton from "../UI/Button/AddButton/AddButton";

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

const BrokersModal = ({modalTitle, isAdd, brokerID}) => {

    const dispatch = useDispatch();
    const brokers = useSelector(state => state.brokers.brokers);
    const editError = useSelector(state => state.brokers.editBrokerError);
    const newError = useSelector(state => state.brokers.addBrokerError);
    const loading = useSelector(state => state.brokers.loading);


    const [newModal, setNewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [brokerId, setBrokerId] = useState('');

    const [newData, setNewData] = useState({
        name: '',
        mc: '',
        description: '',
        // phoneNumber: '',
        // companiesContract: ''
    });

    const [editedData, setEditedData] = useState({
        name: '',
        mc: '',
        description: '',
        // phoneNumber: '',
        // companiesContract: ''
    });

    useEffect(() => {
        dispatch(fetchBrokersRequest());
    }, [dispatch]);

    useEffect(() => {
        if (newError === null) {
            setNewModal(false);
        }
        if (editError === null) {
            setEditModal(false);
        }
        // eslint-disable-next-line
    }, [brokers]);

    const openCloseModal = brokerID => {
        if (isAdd) {
            setNewData({
                name: '',
                mc: '',
                description: '',
                // phoneNumber: '',
                // companiesContract: ''
            });

            setNewModal(true);
            dispatch(clearBrokersErrors());
        } else if (!isAdd) {
            const broker = brokers.filter(item => item._id === brokerID)[0];
            setBrokerId(broker._id);

            setEditedData({
                name: broker.name,
                mc: broker.mc,
                description: broker.description,
                // phoneNumber: broker.phoneNumber,
                // companiesContract: broker.companiesContract
            });

            setEditModal(true);
            dispatch(clearBrokersErrors());
        }
    };

    const inputChangeHandler = (e) => {
        if (e.target) {
            const {name, value} = e.target;
            isAdd
                ? setNewData(prev => ({...prev, [name]: value}))
                : setEditedData(prev => ({...prev, [name]: value}));
        } else {
            isAdd
                ? setNewData(prev => ({...prev, phoneNumber: e.replace(/ /g, '')}))
                : setEditedData(prev => ({...prev, phoneNumber: e.replace(/ /g, '')}));
        }
    };


    const submitFormHandler = async e => {
        e.preventDefault();
        if (isAdd) {
            dispatch(createBrokerRequest(newData));
        } else {
            dispatch(editBrokerRequest({id: brokerId, data: editedData}));
        }
    };

    const getFieldError = fieldName => {
        try {
            return isAdd ? newError.errors[fieldName].message : editError.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <>
            {isAdd
                ? <AddButton click={openCloseModal}/>
                : <EditButton
                    click={() => openCloseModal(brokerID)}
                />
            }
            <Modal
                open={isAdd ? newModal : editModal}
                onClose={() => isAdd ? setNewModal(false) : setEditModal(false)}
                aria-labelledby="transition-modal-name"
                aria-describedby="transition-modal-description"
            >
                <Fade in={isAdd ? newModal : editModal}>
                    <Box sx={style}>
                        <div>
                            <Grid>
                                <Typography variant={'h6'}>
                                    {modalTitle}
                                </Typography>

                                <Grid
                                    component='form'
                                    container
                                    spacing={2}
                                    onSubmit={submitFormHandler}
                                    pr={'15px'}
                                >
                                    <Grid
                                        item
                                        container
                                        spacing={2}
                                        justifyContent="space-between"
                                    >
                                        <Grid item width='100%'>
                                            <FormElement
                                                type={'name'}
                                                name={'name'}
                                                label={'Company name'}
                                                value={isAdd ? newData.name : editedData.name}
                                                required={true}
                                                onChange={inputChangeHandler}
                                                error={getFieldError('name')}
                                            />
                                        </Grid>

                                        {/*<Grid item xs={12} width='100%'>*/}
                                        {/*    <MuiTelInput*/}
                                        {/*        error={Boolean(getFieldError('phoneNumber'))}*/}
                                        {/*        preferredCountries={['US']}*/}
                                        {/*        defaultCountry={'US'}*/}
                                        {/*        name={'phoneNumber'}*/}
                                        {/*        label={'Phone Number'}*/}
                                        {/*        value={isAdd ? newData.phoneNumber : editedData.phoneNumber}*/}
                                        {/*        required={true}*/}
                                        {/*        onChange={inputChangeHandler}*/}
                                        {/*    />*/}
                                        {/*    <FormHelperText sx={{*/}
                                        {/*        color: '#d32f2f',*/}
                                        {/*        margin: '3px 14px 0'*/}
                                        {/*    }}>{getFieldError('phoneNumber')}</FormHelperText>*/}
                                        {/*</Grid>*/}

                                        <Grid item width='100%'>
                                            <FormElement
                                                name={'mc'}
                                                label={'MC'}
                                                value={isAdd ? newData.mc : editedData.mc}
                                                required={true}
                                                onChange={inputChangeHandler}
                                                error={getFieldError('mc')}
                                            />
                                        </Grid>

                                        {/*<Grid item width='100%'>*/}
                                        {/*    <FormElement*/}
                                        {/*        name={'dot'}*/}
                                        {/*        label={'DOT'}*/}
                                        {/*        value={isAdd ? newData.dot : editedData.dot}*/}
                                        {/*        required={true}*/}
                                        {/*        onChange={inputChangeHandler}*/}
                                        {/*        error={getFieldError('dot')}*/}
                                        {/*    />*/}
                                        {/*</Grid>*/}

                                        {/*<Grid item width='100%'>*/}
                                        {/*    <FormElement*/}
                                        {/*        name={'fedid'}*/}
                                        {/*        label={'FED ID'}*/}
                                        {/*        value={isAdd ? newData.fedid : editedData.fedid}*/}
                                        {/*        required={true}*/}
                                        {/*        onChange={inputChangeHandler}*/}
                                        {/*        error={getFieldError('fedid')}*/}
                                        {/*    />*/}
                                        {/*</Grid>*/}

                                        <Grid item width='100%'>
                                            <FormElement
                                                name={'description'}
                                                label={'Description'}
                                                value={isAdd ? newData.description : editedData.description}
                                                onChange={inputChangeHandler}
                                                error={getFieldError('description')}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <ButtonWithProgress
                                            loading={loading}
                                            disabled={loading}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            Save
                                        </ButtonWithProgress>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <ButtonWithProgress
                                            type="button"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={() => isAdd ? setNewModal(false) : setEditModal(false)}
                                        >
                                            Cancel
                                        </ButtonWithProgress>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default BrokersModal;