import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import AllSatus from './status/AllStatus';
import {
  createBrowserRouter,
  RouterProvider, 
  Route,
  Link,
} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import StatusDetails from './status/StatusDetails';
import UserDetails from './status/UserDetails';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function App(){
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
    function Header(){
        return (
          <>
          <Navbar bg="primary" variant="dark" >
              <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/">Logout</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
            </>
        )
      }


return(<div>
    <Header/>
    <RouterProvider router={reactRouter}/>
</div>
)

}
