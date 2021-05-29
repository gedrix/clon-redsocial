
const bcrypt = require('bcrypt');
const User = require('../models/user');
var jwt = require('../jwt/jwt');


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
                                    if(err) return res.status(500).send({message: 'error en la petición del usuario'});

                                    if(users && users.length >= 1){
                                        return res.status(200).send({
                                            status: 'error',
                                            message: 'ya existe el usuario :(',
                                        });
                                    }else{
                                        user.password = bcrypt.hashSync(params.password, 8);
                                        user.save((err, userStored)=>{
                                            if(err) return res.status(500).send({ message: 'error al guardar el usuario'});
                                        
                                            if(userStored){
                                                //res.status(200).send({user: userStored});
                                                return res.status(200).send({
                                                    status: 'succes',
                                                    message: 'registro correcto'
                                                });
                                            }
                                            // }else{
                                            //     res.status(404).send({message: 'no se registro el usuario'});
                                            // }
                                        });

                                    }
                                });
           
    }else{
        res.status(200).send({
            message: 'envia todos los campos'
        });
    }

}

//*******LOGIN*********
function loginUser(req, res)
{
     const params = req.body;
     const email = params.email;
     const password = params.password;
    
     User.findOne ({email: email}, (err, user)=> {
        if (err) return res.status(500).send({message: 'error en la peticion'});
        let equals = bcrypt.compareSync(password, user.password);
        if (equals) 
        {
            const token = jwt.createtToken(user);
            return res.status(200).json({token}); 
        }else{
             return res.status(401).send({
                status: 'error',
                 message: 'Password no coninciden'
             });
           
        }
    })    
}
module.exports = {
    
    registerUser,
    loginUser

}
