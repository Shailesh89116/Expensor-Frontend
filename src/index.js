import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './pages/Login';
import './index.css'
import Home from './pages/Home';
import Register from './pages/Register';
import router from './routes/Routes'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
     
      <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
     
  
);


