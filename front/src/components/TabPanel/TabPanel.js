import React from 'react';
import {Box, Grid, IconButton, Pagination, Stack, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import FormSelect from "../UI/Form/FormSelect/FormSelect";
import {showedItemCount} from "../../config";

const TabPanel = (props) => {
  const { children, value, index, header, body, history, goWeekBack, goWeekForward, week, pageCount, changePage, page, limitItem, changeLimit, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {history === "?status=finished" ?
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <IconButton onClick={goWeekBack}>
                  <ChevronLeft fontSize="large"/>
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>{week}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={goWeekForward}>
                  <ChevronRight fontSize="large"/>
                </IconButton>
              </Grid>
            </Grid>
            :
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
                <Typography>Показать на странице: </Typography>
              </Grid>
              <Grid item>
                <FormSelect
                  variant="array"
                  array={showedItemCount}
                  value={limitItem}
                  onChange={changeLimit}
                  paddingY="10px"
                  height="30px"
                />
              </Grid>
              <Grid item>
                <Stack spacing={2} padding={"16px"}>
                  <Pagination
                    count={pageCount}
                    size={"large"}
                    onChange={changePage}
                    page={page}
                  />
                </Stack>
              </Grid>
            </Grid>
          }
          <TableContainer component={Paper} sx={{background: "#f0f2fe"}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {header}
                </TableRow>
              </TableHead>
              <TableBody>
                {body}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;