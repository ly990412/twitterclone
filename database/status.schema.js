const Schema = require('mongoose').Schema

exports.StatusSchema = new Schema({
    username: String,
    comment : {
        default:[],
        type:Array
    },
    timestamp :{
        default:[],
        type : Array
    }
}, {collection: 'status'});