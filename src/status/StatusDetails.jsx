import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import './StatusDetails.css'
export default function StatusDetails(){
    const params = useParams();
    const [status,setStatus] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(function(){
        const username  = params.username;
        axios.get('/app/status/user/' + username + '/')
        .then(function(response){
            const data = response.data[0];
            //console.log(pokemonId);
            setStatus(data);
            //console.log(pokemon);
        })
        .catch(function(error){
            setIsError(true);
        })
        .finally(function(){
            setIsLoading(false);
        })
    });
    if (isLoading){
        return (<div>Loading...</div>)
    }
    if (isError){
        return (<div>Could not find status with name {params.username}</div>)
    }
    const comments = status.comment;
    const out = [];
    for(let i = comments.length-1; i >=0; i--){
        const out_comment = (<li className="element">
            {comments[i]}
            </li>)
        out.push(out_comment);
     }
    return(<div>
        <div><h1 className="Name">{status.username}</h1></div>
        <div>
            <div><h3 className="Comment">Comments:</h3></div>
            <div>
                {out}
            </div>
        </div>
    </div>)
}