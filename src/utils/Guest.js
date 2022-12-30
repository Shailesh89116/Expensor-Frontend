import React from 'react';
import Cookies from "js-cookie";
import { Navigate} from "react-router-dom";
import Home from '../pages/Home';
import { useSelector } from 'react-redux';

const Guest = ({children}) => {
    const auth=useSelector(state=>state.auth);
    return (
        !auth.isAuthenicated?children:<Navigate to='/' replace={true}/>
    )
}

export default Guest
