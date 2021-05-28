const jwt = require('jwt-simple');
const moment = require('moment');
const secret ='clavesecretabiensecreta';

exports.createtToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        rol: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    };
    return jwt.encode(payload, secret);
};