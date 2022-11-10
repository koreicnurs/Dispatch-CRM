import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

const DriversTable = ({columns, drivers}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(item => (
              <TableCell sx={{color: '#192B6D'}} key={item.key + item.innerKey}>{item.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((row) => (
            <TableRow
              key={row.name}
              sx={{ margin: '5px 0', '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map(item => {
                let value = row[item.key];
                if (item.innerKey) {
                  value = value[item.innerKey];
                }
                return <TableCell key={item.key + item.innerKey}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DriversTable;