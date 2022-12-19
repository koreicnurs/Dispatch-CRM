import React from 'react';
import {TableCell} from '@mui/material';
import StatusUpdateModal from './StatusUpdateModal';

const EditStatusUpdate = ({driverEmail}) => (
  <TableCell>
    <StatusUpdateModal driverEmail={driverEmail}/>
  </TableCell>
);

export default EditStatusUpdate;