import ReactDOM from 'react-dom/client';
import App from '../App';
import Login from '../pages/Login';
import '../index.css'
import Home from '../pages/Home';
import Register from '../pages/Register';

import {
    createBrowserRouter, Navigate
  } from "react-router-dom";
import Checkauth from '../utils/Checkauth';
import Guest from '../utils/Guest';

export default createBrowserRouter([
    {
      element: <App/>,
      children:[ {
        path: "/",
        element:<Checkauth>
          <Home/>
        </Checkauth>
    
      },
      {
        path: "/register",
        element: <Guest><Register/></Guest>,
      },
      {
        path: "/login",
        element: <Guest><Login/></Guest>,
      }]
    },
  ]);
  