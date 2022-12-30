import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { Navigate,redirect} from "react-router-dom";
import Home from '../pages/Home';
import { useSelector } from 'react-redux';

const Checkauth = ({children}) => {
    
const auth=useSelector(state=>state.auth);
 
  return (
   
   auth.isAuthenticated ? children:<Navigate to='/login'/>
  )
}

export default Checkauth
