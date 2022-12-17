import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import './Register.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export default function Register(){
    const navigate = useNavigate();
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    function updatePassword(event){
        setPassword(event.target.value);
    }
    function updateUserName(event){
        setUserName(event.target.value);
    }
    function createUser(){
        Axios.post('/app/user/register',{
            name : userName,
            password
        })
        .then(function(response) {
            navigate('/logged/'+response.data.username);
        })
        .catch(function(error){
            setIsError(true);
        })
        
       
    }
    if (isError){
        return (<div className="error">User existed</div>);
    }
    return (
        <div className='register'>
            <p className='regititle'>Create New User</p>
            <div>
            <Form>
                <Form.Group as={Row} >
                <Form.Label column sm="1">Name:</Form.Label>
                <Col sm="3">
            <Form.Control type="text" onInput={updateUserName}/>
                </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Form.Label column sm="1">Password:</Form.Label>
                <Col sm="3">
            <Form.Control type="password" onInput={updatePassword}/>
                </Col>
                </Form.Group>
                </Form>
            </div>
            <Button onClick={createUser} className='submit'>Submit</Button>
        </div>
    )
}