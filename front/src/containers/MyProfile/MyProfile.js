import React from 'react';
import {useSelector} from "react-redux";
import AdminProfile from "../../components/Profile/AdminProfile";
import UserProfile from "../../components/Profile/UserProfile";

const MyProfile = () => {
  const user = useSelector(state => state.users.user);
  const error = useSelector(state => state.users.fetchError);

  return (
    <>
      {
        user.role === "admin"
          ? <AdminProfile user={user} error={error}/>
          : <UserProfile user={user} error={error}/>
      }
    </>
  );
};

export default MyProfile;