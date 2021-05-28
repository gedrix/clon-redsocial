const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String,
    image: String
},{
    timestamps:true
});

module.exports = model('User', userSchema);