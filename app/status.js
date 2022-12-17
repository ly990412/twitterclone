const express = require('express');
const { UNSAFE_enhanceManualRouteObjects } = require('react-router');

const StatusModel = require('../database/status.model');

const router = express.Router();

router.get('/', function(request, response) {
    //response.cookie("ownerName","Hunter");
    return StatusModel.getAllStatus()
    .then(function(data){
        //response.sendStatus(data.length);
        response.send(data);
    })
    .catch(function(err){
        response.status(400);
        response.send(err);
    })
})
router.get('/user/:user', function(request, response) {

    const user = request.params.user;

    return StatusModel
    .getStatusByUser(user)
        .then(function(userResult) {
           //return response.send(userResult.username);
           const comments = userResult[0].comment
           //if (comments.length>0){
            response.send(userResult);

           
        })
 })
router.post('/user/:username/:comment', function(request, response) {
    const comment = request.params.comment;
    const user = request.params.username;
    const timestamp = Date.now();
    StatusModel.getStatusByUser(user)
    .then(function(data){
        let comments = data[0].comment;
        let timestamps = data[0].timestamp;
        comments.push(comment);
        timestamps.push(timestamp);
        //StatusModel.removeStatus(user);
        StatusModel.updateStatus(user,comments);
        StatusModel.timeStatus(user,timestamps);
        return response.send([comments,timestamps]);
    });
router.post('/delete/:username/:comment',function(request,response){
    const comment = request.params.comment;
    const user = request.params.username;
    StatusModel.getStatusByUser(user)
    .then(function(data){
        let comments = data[0].comment;
        let timestamps = data[0].timestamp;
        const newComment = [];
        const newStamp = [];
        let idx = -1;
        for (let i=0;i<comments.length;i++){
            if (comments[i] === comment){
                idx = i;
            }
            else{
                newComment.push(comments[i]);
            }
        }
        for (let j = 0;j<timestamps.length;j++){
            if (!(j === idx)){
                newStamp.push(timestamps[j]);
            }
        }
        StatusModel.updateStatus(user,newComment);
        StatusModel.timeStatus(user,newStamp);
        return response.send([newComment,newStamp]);
    })
    .catch(function(err){
        return response.status(500).send(err);
    })
})
    // const user = request.params.user;
    // body.username = user;
    //statuses = StatusModel.getAllStatus();
    //body.id = Number(statuses.length);
    // return StatusModel
    // .insertStatus(body)
    //     .then(function(data) {
    //          response.send(data);
    //     })
    //      .catch(function(err){
    //         response.status(405)
    //         response.send(body);
    //     })

})
    
    
module.exports = router;