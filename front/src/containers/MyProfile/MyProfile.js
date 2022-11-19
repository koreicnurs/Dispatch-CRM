import React from 'react';
import {useSelector} from "react-redux";
import AdminProfile from "../../components/Profile/AdminProfile";
import UserProfile from "../../components/Profile/UserProfile";

const MyProfile = () => {
  const user = useSelector(state => state.users.user);

  return (
    <>
      {
        user.role === "admin"
          ? <AdminProfile/>
          : <UserProfile/>
      }
      
    </>
  );
};

export default MyProfile;