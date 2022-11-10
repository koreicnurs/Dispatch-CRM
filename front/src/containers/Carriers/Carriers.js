import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import AddButton from "../../components/UI/AddButton/AddButton";
import TitleItem from "../../components/TitleItem/TitleItem";
import CarrierItem from "../../components/CarrierItem/CarrierItem";
import NewCarrier from "../../components/Modals/NewCarrier";
import InnerContainer from "../../components/InnerContainer/InnerContainer";

const Carriers = () => {
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

      <InnerContainer>
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

      </InnerContainer>

    </>
  );
};

export default Carriers;