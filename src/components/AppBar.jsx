import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, Link,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {logout} from '../store/auth'
import { useDispatch, useSelector } from 'react-redux';

export default function Appbar() {
const dispatch=useDispatch();
const navigate=useNavigate();
const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
const user=useSelector(state=>state.auth.user);

  function btnLogout(){
    Cookies.remove('token');
    dispatch(logout());
    navigate('/login');
  }

  function nameCreate() {
    return user.firstName + " " + user.lastName;
  }
  
  const fullName=nameCreate();
  const name=fullName.toUpperCase();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className='text-white'>Expensor</Link>
          </Typography>
          {isAuthenticated && 
          <>
          <Typography variant="h6" component="div" sx={{marginRight:"10px" }}>
            <p>Welcome {name}</p>
          </Typography>
          <Button color="inherit" onClick={btnLogout}>Logout</Button>
          </>
          }
          {
            !isAuthenticated && <>
          <Link to="/register" className='text-white'>
          <Button color="inherit">Register</Button>
          </Link>
          <Link to="/login" className='text-white'>
          <Button color="inherit">Login</Button>
          </Link> 
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
