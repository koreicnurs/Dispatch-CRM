import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import {Container, Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import AddButton from "../../components/UI/AddButton/AddButton";
import TitleItem from "../../components/TitleItem/TitleItem";

const useStyles = makeStyles()(theme => ({
  innerContainer: {
    background: '#D9D9D9',
    height: "100vh"
  },
  headerTitle: {
    width: "96px",
    height: "14px",
    paddingLeft: "30px"
  }
}));

const Carriers = () => {
  const {classes} = useStyles();
  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers);

  useEffect(() => {
    dispatch(fetchCarriersRequest());
  }, [dispatch]);
  return (
    <Container maxWidth="xl" className={classes.innerContainer} >
      <Grid
        container
        direction='column'
        spacing={2}
      >
        <AddButton newItem='newCarrier'/>

        <Grid
          item
          container
          spacing={2}
        >
          <TitleItem title="Company"/>
          <TitleItem title="MC"/>
          <TitleItem title="DOT"/>
          <TitleItem title="FED-ID"/>
        </Grid>
      </Grid>

    </Container>
  );
};

export default Carriers;