const jwt = require('jwt-simple');
const moment = require('moment');
const secret ='clavesecretabiensecreta'; //esto puede cambiar con lo que quramos

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({menssage: 'la peticion no tiene la cabecera de autentificaion'});
    }

    const token= req.headers.authorization.replace(/['"]+/g, '');

    try {
        const payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                menssage: 'el token ha experiado :C'
            });
        }
    } catch (ex) {
        return res.status(404).send({
            menssage: 'el token es valido :v'
        });
    }
    
    req.user = payload;

    next(); //para que salga del middlaware

}