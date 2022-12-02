import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";
import AddCarrier from "../../components/Modals/AddCarrier";
import InnerContainer from "../../components/InnerContainer/InnerContainer";
import InnerTable from "../../components/Table/InnerTable";
import TableHeaderRow from "../../components/Table/TableHeader/TableHeaderRow";
import CarrierTableBody from "../../components/Table/TableBody/CarrierTableBody";

const columns = [
  {key: 'title', label: 'Company'},
  {key: 'phoneNumber', label: 'Phone Number'},
  {key: 'mc', label: 'MC'},
  {key: 'dot', label: 'DOT'},
  {key: 'fedid', label: 'FED-ID'},
];


const Carriers = () => {
  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers.carriers);

  useEffect(() => {
    dispatch(fetchCarriersRequest());
  }, [dispatch]);

  return (
    <>
      <InnerContainer>
        <Grid item sx={{paddingLeft: "15px"}}>
          <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
            Carriers
          </Typography>
        </Grid>
        <Grid container item flexDirection="row" justifyContent="space-between" alignItems="center" paddingRight="15px">
          <AddCarrier/>
        </Grid>

        <InnerTable
          header={<TableHeaderRow headerCells={columns} data={true} sx={{fontSize: "12px", fontWeight: "bold"}}/>}
          body={
            <CarrierTableBody
              columns={columns}
              carriers={carriers}
            />
          }
        />

      </InnerContainer>
    </>
  );
};

export default Carriers;