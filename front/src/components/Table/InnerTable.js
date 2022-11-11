import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const InnerTable = ({header, body}) => (
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
);

export default InnerTable;