
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


//*******REGISTRO*********
function registerUser(req, res)
{
    const params = req.body;
    const user = new User();
    if (params.name && params.surname && params.nick && params.email 
        && params.password){

            user.name = params.name;
            user.surname = params.surname;
            user.nick = params.nick;
            user.email= params.email;
            user.role = 'ROLE_USER';
            user.image = null;
            
            //para ver si exite repetidos
            User.find({ $or: [ 
                                {email: user.email.toLowerCase()},
                                    {nick: user.nick.toLowerCase()}
                                ]}).exec((err, users)=>{
                                    if(err) return res.status(500).send({message: 'error en la peticióon del usuario'});

                                    if(users && users.length >= 1){
                                        return res.status(200).send({
                                            message: 'error al guardar usuario, ya existe :('
                                        });
                                    }else{
                                        //cifrar la contraseña  y guardar 
                                        user.password = params.password;
                                        user.save((err, userStored)=>{
                                            if(err) return res.status(500).send({ message: 'error al guardar el usuaio'});

                                            if(userStored){
                                                res.status(200).send({user: userStored});
                                            }else{
                                                res.status(404).send({message: 'no se registro el usuario'});
                                            }
                                        });
                                    }
                                });
           
    }else{
        res.status(200).send({
            message: 'envia todos los campos'
        });
    }

}


module.exports = {
    
    registerUser,
    

}
