// import React from 'react';
// import TableRow from "@mui/material/TableRow";
// import TableCell from "@mui/material/TableCell";
// import EditBroker from "../../Modals/EditBroker";
//
// const BrokerTableBody = ({columns, brokers}) => {
//
//     return (
//         <>
//             {brokers.map(broker => (
//                 <TableRow
//                     key={broker._id}
//                     sx={{
//                         '&:last-child td, &:last-child th': {border: 0}, background: "white",
//                         cursor: "pointer", ":active": {background: '#f0f2fe'}
//                     }}
//                 >
//                     {columns.map(column => {
//                         let value = broker[column.key];
//                         console.log(broker[column.key]);
//                         return <TableCell sx={{fontSize: "12px"}} key={column.key}>{value}</TableCell>;
//                     })}
//                     <EditBroker brokerID={broker._id}/>
//                 </TableRow>
//             ))}
//         </>
//     );
// };
//
// export default BrokerTableBody;

import React from 'react';
import BrokerTableBodyRow from "./BrokerTableBodyRow";

const BrokerTableBody = ({columns, brokers}) => {
    return (
        <>
            {brokers.map((broker) => (
                <BrokerTableBodyRow key={broker.name} broker={broker} columns={columns}/>
            ))}
        </>
    );
}
export default BrokerTableBody;