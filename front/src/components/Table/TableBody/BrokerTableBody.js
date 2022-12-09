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