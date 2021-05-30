const jwt = require('jwt-simple');
const moment = require('moment');
const secret ='clavesecretabiensecreta';

exports.createtToken = function(user){
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        rol: user.role,
        image: user.image,
    };
    return jwt.encode(payload, secret);
};