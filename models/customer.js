var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email :{
        type: String, 
        required: true, 
        lowercase: true, 
        unique: true
    },
    password: String
}, {
    timestamps: true
});

modeules.exports = mongoose.model('Customer', customerSchema);