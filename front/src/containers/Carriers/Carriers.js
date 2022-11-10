import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import AddButton from "../../components/UI/AddButton/AddButton";
import NewCarrier from "../../components/Modals/NewCarrier";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import CarrierTableBody from "../../components/Table/TableBody/CarrierTableBody";

const headerTitles = ["Company", "MC", "DOT", "FED-ID"];

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
        <Grid item sx={{paddingLeft: "15px"}}>
          <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
            Carriers
          </Typography>
        </Grid>

        <AddButton click={() => setOpen(true)}/>

        <InnerTable
          header={<TableHeaderRow headerCells={headerTitles}/>}
          body={<CarrierTableBody carriers={carriers}/>}
        />

      </InnerContainer>

    </>
  );
};

export default Carriers;