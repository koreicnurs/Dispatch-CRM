import React, {useState} from 'react';
import {makeStyles} from "tss-react/mui";
import {Box, Grid, IconButton, Modal, Typography} from "@mui/material";
import {Description} from "@mui/icons-material";
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {apiUrl} from "../../config";
import ButtonWithProgress from "../UI/Button/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles()(theme => ({
    link: {
        color: "white",
        textDecoration: "none",
    }
}));

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

const ViewerModal = ({modalTitle, license}) => {
    const {classes} = useStyles();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {license &&
                <>
                    <IconButton color="primary" onClick={handleOpen}>
                        <Description/>
                    </IconButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <Typography variant={'h6'}>
                                {modalTitle}
                            </Typography>

                            <Document file={apiUrl + '/' + license}>
                                <Page pageNumber={1}/>
                            </Document>

                            <Grid item container spacing={2} justifyContent="space-between">
                                <Grid item xs={6}>
                                    <ButtonWithProgress fullWidth variant="contained" color="primary">
                                        <a href={apiUrl + '/' + license} target="_blank" download
                                           className={classes.link}
                                           rel="noreferrer">Download</a>
                                    </ButtonWithProgress>
                                </Grid>

                                <Grid item xs={6}>
                                    <ButtonWithProgress type="button" fullWidth variant="contained" color="primary"
                                                        onClick={handleClose}>
                                        Close
                                    </ButtonWithProgress>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </>
            }
        </>
    );
};

export default ViewerModal;