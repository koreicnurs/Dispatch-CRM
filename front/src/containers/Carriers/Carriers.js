import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import {makeStyles} from "tss-react/mui";
import AddButton from "../../components/UI/AddButton/AddButton";
import TitleItem from "../../components/TitleItem/TitleItem";
import CarrierItem from "../../components/CarrierItem/CarrierItem";
import {Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import NewCarrier from "../../components/Modals/NewCarrier";

const useStyles = makeStyles()(theme => ({
  innerContainer: {
    background: '#f0f2fe',
    height: "100vh",
    paddingLeft: "15px",
    paddingBottom: "15px",
    paddingTop: "15px"
  }
}));

const Carriers = () => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers.carriers);

  useEffect(() => {
    dispatch(fetchCarriersRequest());
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <NewCarrier open={open} handleClose={handleClose}/>

      <Box className={classes.innerContainer}>
        <Grid
          container
          direction='column'

        >
          <Grid item>
            <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
              Carriers
            </Typography>
          </Grid>

          <AddButton click={() => setOpen(true)}/>

          <Grid
            item
            container
            spacing={2}
            marginBottom="20px"
          >
            <TitleItem title="Company"/>
            <TitleItem title="MC"/>
            <TitleItem title="DOT"/>
            <TitleItem title="FED-ID"/>
          </Grid>

          <Grid item container>
            {carriers.length !== 0 &&
              carriers.map(carrier => (
                <CarrierItem key={carrier._id} carrier={carrier}/>
              ))
            }
          </Grid>

        </Grid>
      </Box>

    </>
  );
};

export default Carriers;