import Axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export default function Login() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function updateUserName(event) {
        setUserName(event.target.value);
    }

    function createUser() {
        Axios.post('/app/user/authenticate', {
            name: userName,
            password,
        })
         .then(function(response) {
            navigate('/logged/'+response.data.username);
        })
    .catch(function(error){
        setIsError(true);
    })

    }
    if (isError){
        return (<div className='err'>User doesn't exist or password isn't valid</div>);
    }

    return (
        <div className='log'>
            <p className='logtitle'>Login with Existing User</p>
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
            <Button onClick={createUser} className='sub'>Submit</Button>

        </div>
    )


}