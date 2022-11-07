import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCarriersRequest} from "../../store/actions/carriersActions";

const Carriers = () => {
  const dispatch = useDispatch();
  const carriers = useSelector(state => state.carriers);

  useEffect(() => {
    dispatch(fetchCarriersRequest());
  }, [dispatch]);
  return (
    <div>

    </div>
  );
};

export default Carriers;