import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchCarrierRequest, fetchCarriersRequest} from "../../store/actions/carriersActions";
import AddButton from "../../components/UI/Button/AddButton/AddButton";
import NewCarrier from "../../components/Modals/NewCarrier";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import CarrierTableBody from "../../components/Table/TableBody/CarrierTableBody";
import EditButton from "../../components/UI/Button/EditButton/EditButton";
import EditCarrier from "../../components/Modals/EditCarrier";

const headerTitles = ["Company", "MC", "DOT", "FED-ID"];

const Carriers = () => {
  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers.carriers);
  const carrier = useSelector(state => state.carriers.carrier);

  useEffect(() => {
    dispatch(fetchCarriersRequest());
  }, [dispatch]);

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleCloseAdd = () => setOpenAdd(false);

  // const [carrierToEdit, setCarrierToEdit] = React.useState('');

  const onChoose = id => {
    console.log(id);
    dispatch(fetchCarrierRequest(id));
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
      <NewCarrier open={openAdd} handleClose={handleCloseAdd}/>
      <EditCarrier open={openEdit} handleClose={handleCloseEdit} carrier={carrier}/>

      <InnerContainer>
        <Grid item sx={{paddingLeft: "15px"}}>
          <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
            Carriers
          </Typography>
        </Grid>
        <Grid container item flexDirection="row" justifyContent="space-between" alignItems="center" paddingRight="15px">
          <AddButton click={() => setOpenAdd(true)}/>
          <EditButton click={() => setOpenEdit(true)}/>
        </Grid>

        <InnerTable
          header={<TableHeaderRow headerCells={headerTitles}/>}
          body={
          <CarrierTableBody
              carriers={carriers}
              onChoose={onChoose}
          />}
        />

      </InnerContainer>
    </>
  );
};

export default Carriers;