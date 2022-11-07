import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import AddButton from "../../components/UI/AddButton/AddButton";
import TitleItem from "../../components/TitleItem/TitleItem";
import CarrierItem from "../../components/CarrierItem/CarrierItem";

const useStyles = makeStyles()(theme => ({
  innerContainer: {
    background: '#D9D9D9',
    height: "100vh"
  }
}));

const Carriers = () => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers.carriers);

  useEffect(() => {
    dispatch(fetchCarriersRequest());
  }, [dispatch]);
  return (
    <Container maxWidth="xl" className={classes.innerContainer}>
      <Grid
        container
        direction='column'
      >
        <AddButton newItem='newCarrier'/>

        <Grid
          item
          container
          spacing={2}
          marginBottom="16px"
          marginLeft="-24px"
        >
          <TitleItem title="Company"/>
          <TitleItem title="MC"/>
          <TitleItem title="DOT"/>
          <TitleItem title="FED-ID"/>
        </Grid>

        {carriers.length !== 0 &&
          carriers.map(carrier => (
            <CarrierItem key={carrier._id} carrier={carrier}/>
          ))
        }
      </Grid>

    </Container>
  );
};

export default Carriers;