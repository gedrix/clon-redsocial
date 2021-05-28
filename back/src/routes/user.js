const express = require('express'); 
const UserController = require('../controllers/user');

const api = express.Router();
api.post('/register-user', UserController.registerUser);
api.post('/login', UserController.loginUser);


module.exports = api;