import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AllSatus from './status/AllStatus';
import {
  createBrowserRouter,
} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import StatusDetails from './status/StatusDetails';
import UserDetails from './status/UserDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));

const reactRouter = createBrowserRouter([
  {
    path:"/",
    element : <AllSatus/>
  },
  {
    path :"/register",
    element : <Register/>
  },
  {
    path :"/login",
    element: <Login/>
  },
  {
    path :"/user/:username",
    element : <StatusDetails/>
  },
  {
    path :"/logged/:username",
    element : <UserDetails/>
  }
 
])
root.render(
  <React.StrictMode>
    <App/>
    
  </React.StrictMode>
);


