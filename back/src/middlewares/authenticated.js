const jwt = require('jwt-simple');
const moment = require('moment');
const secret ='clavesecretabiensecreta'; //esto puede cambiar con lo que quramos
const payload ='';
//authorization se envia por header
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({menssage: 'la peticion no tiene la cabecera de autentificaion'});
    }

    const token= req.headers.authorization.replace(/['"]+/g, '');
    this.payload = jwt.decode(token, secret);
    
    if ( this.payload  == '') {
        return res.status(404).send({
            menssage: 'el token es valido'
        });
    }
    req.user = this.payload;
    next(); //para que salga del middlaware

}