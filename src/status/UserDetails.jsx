

import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import './UserDetails.css'
export default function UserDetails(){
    const [user,setUser] = useState({});
    const [description,setDescription] = useState('');
    const [newComment,setNewComment] = useState('');
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [status,setStatus] = useState({});
    const username = params.username;
    function onDescriptionInput(e) {
        const des = e.target.value;
        setDescription(des);
        //console.log(des);
    }
    function onCommentInput(e){
        const com = e.target.value;
        setNewComment(com);
    }
    function getStatus(){
        axios.get('/app/status/user/' + username + '/')
        .then(function(response){
            //console.log(response.data);
            const data = response.data[0];
           //console.log(pokemonId);
           if (data.username === undefined){
            setIsError(true);
           }
           else{
            setStatus(data);
           }
            
         })
         .catch(function(error){
            setIsError(true);
        })
        .finally(function(){
            
            setIsLoading(false);
        })
    }
    function getUser(){
        axios.get('/app/user/' + username +'/')
        .then(function(response){
            setUser(response.data[0]);
        })
        .catch(function(error){
            setIsError(true);
        })
        .finally(function(){
            setIsLoading(false);
        })
    }
    function Modify() {
        Axios.post('/app/user/' + username + '/' +  description +'/')
            .then(function(response) {
                getUser();
            })
            .finally(function() {
                setNewComment('');
            });
    }
    function AddComment(){
        Axios.post('/app/status/user/' + username + '/' +  newComment +'/')
            .then(function(response) {
                getStatus();
            })
            .finally(function() {
                setNewComment('');
            });
    }
    function deleteComment(comment){
        const oldComment = comment.target.value;
        console.log(comment.target.value);
        Axios.post('/app/status/delete/' + username + '/' +  oldComment +'/')
            .then(function(response) {
                getStatus();
            })

    }
    useEffect(function(){ 
        getUser();
        getStatus();

    });
    
    if (isLoading){
        return (<div>Loading...</div>)
    }
    const out = [];
    let comments = status.comment;
    if (comments === undefined){
        comments = [];
    }
    // console.log(status);
    // console.log(comments);
    // console.log(comments === undefined);
    // if (comments === undefined){
    //     setIsError(true);
    // }
    if (!isError){
        
    
        for(let i = comments.length-1; i >=0; i--){
        const out_comment = [<li className="ele">
          {comments[i]}
       </li>,
       <Button onClick={deleteComment} value={comments[i]} >delete</Button>]
        out.push(out_comment);
        }
    }
    //let des = user.description;
    //const des = user.description
    //const [description,setDescription] = useState(des);
    return(<div className="use">
        <div><h1 className="User">{user.name}</h1></div>
            <div className="Des">
            <div><h3>Description:</h3></div>
            <div>
                <p className="des">{user.description}</p>
            </div>
            </div>
            <div>
                <Form>
                <Form.Group>
                    <Form.Label ><b>New description:</b></Form.Label>
                    <Col sm='5'>
                    <Form.Control as="textarea" value={description} onInput={onDescriptionInput} /></Col>
                </Form.Group>
               
                </Form>
            </div>
            <div>
            <Button variant="primary" onClick={Modify} className="button">Modify</Button>
            </div>
            <div><h3 className="com">Comments:</h3></div>
            <div>
               <ul >{out}</ul>
            </div>
            <div>
            <Form>
                <Form.Group>
                    <Form.Label ><b>New Comments:</b></Form.Label>
                    <Col sm='5'>
                    <Form.Control as="textarea" value={newComment} onInput={onCommentInput} /></Col>
                </Form.Group>
               
                </Form>
                
            </div>
            <div className="button">
            <Button onClick = {AddComment}>Add</Button>
            </div>
    </div>)
}