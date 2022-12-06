import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBrokersRequest} from "../../store/actions/brokersActions";

const Brokers = () => {
    const dispatch = useDispatch();
    const brokers = useSelector(state => state.brokers.brokers);
    console.log(brokers)

    useEffect(() => {
        dispatch(fetchBrokersRequest());
    }, [dispatch]);
    return (
        <div>
            Brokers
        </div>
    );
};

export default Brokers;