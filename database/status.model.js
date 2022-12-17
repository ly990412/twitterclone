const mongoose = require('mongoose');

const StatusSchema = require('./status.schema').StatusSchema;

const StatusModel = mongoose.model("status", StatusSchema);

function insertStatus(status) {

    return StatusModel.create(status);

}
function removeStatus(username){
    return StatusModel.remove({
        username:username
    }).exec();
}
function updateStatus(username,comment){
    return StatusModel.updateOne({username:username},{comment:comment}).exec();
}
function timeStatus(username,timestamp){
    return StatusModel.updateOne({username:username},{timestamp:timestamp}).exec();
}

function getAllStatus() {
    return StatusModel.find().exec();
}



function getStatusByUser(username) {
    return StatusModel.find({
        username: username
    }).exec();
}


module.exports = {
    insertStatus,
    getAllStatus,
    getStatusByUser,
    removeStatus,
    updateStatus,
    timeStatus,
}