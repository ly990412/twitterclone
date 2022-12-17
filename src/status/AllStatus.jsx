import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink,Link } from 'react-router-dom';
import './AllStatus.css'
export default function AllSatus(){
    const [statuses, setStatuses] = useState([]);
    function getAllStatus() {
        // let getPokemonData = null;
        Axios.get('/app/status')
        .then(function(response) {
            setStatuses(response.data);
        })
    }
    useEffect(function() {
        getAllStatus();
    });
    const timeMap = new Map();
    const timeArray = [];
    for (let j = 0; j<statuses.length;j++){
        let username = statuses[j].username;
        let comments = statuses[j].comment;
        let times = statuses[j].timestamp;
        if (username){
            for (let m = 0;m<comments.length;m++){
                timeArray.push(times[m]);
                timeMap.set(times[m],[comments[m],username]);
            }
        } 
    }
    timeArray.sort(function(a, b){return a - b});
    const status_components = [];

    for(let i = timeArray.length-1; i >=0; i--){
        const time = timeArray[i];
        const comment = timeMap.get(time)[0];
        const username = timeMap.get(time)[1];
        const status_component = [<li className="name">
           <NavLink to={'/user/' + username} >{username}</NavLink>
           </li>,<p className="comment">{comment}</p>]
        status_components.push(status_component);
    }
    return (<div >
        <h1 className="Title">Here are all status: </h1>
        <div className="Status">
            <div>
        <ul className= "table">
            {status_components}
        </ul>
        </div>
        </div>
    </div>)

}