import React from 'react';
import {useAuth} from "../contexts/auth-context";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
  let {currentUser} = useAuth();
  if(!currentUser) {
    return <Navigate to="/"/>
  }
  return children
};

export default ProtectedRoute;