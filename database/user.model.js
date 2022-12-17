const mongoose = require('mongoose');

const UserSchema = require('./user.schema').UserSchema;

const UserModel = mongoose.model("user", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

function getUserByName(name) {
    
    return UserModel.find({
        name,
    }).exec();
}
function updateDescription(username,description){
    return UserModel.updateOne({name:username},{description:description}).exec();
}


module.exports = {
    createUser,
    getUserByName,
    updateDescription,
}