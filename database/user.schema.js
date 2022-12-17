const Schema = require('mongoose').Schema

exports.UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    description:{
        default: "",
        required: false , 
        type: String
    },
    password: String,
}, {collection: 'user'});