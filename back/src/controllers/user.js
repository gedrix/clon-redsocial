
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('../jwt/jwt');
const path = require('path');

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
        if (err) return res.status(500).send({status: 'error', message: 'error en la peticion'});
        let equals = bcrypt.compareSync(password, user.password);
        if (equals) 
        {
            const token = jwt.createtToken(user);
            user.password = undefined; 
            return res.status(200).json({token, user}); 
        }else{
             return res.status(200).send({
                status: 'error',
                 message: 'Password no coninciden'

             });
           
        }
    })    
}

//*******EDIT USER*********
function updateUser(req, res){
    const userId = req.params.id;
    const update = req.body;

    //borrar la propiedad password
    delete update.password; //no quiero editar clave

    if(userId != req.user.sub){
        return res.status(500).send({message:'no tienes permiso para actualizar los datos del usuario'});
    }

    User.findByIdAndUpdate(userId, update,{new:true} ,(err, userUpdated)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'});

        if(!userUpdated) return res.status(404).send({message: 'no se ha podido actualizar el usuario'});

        return res.status(200).send({
            user: userUpdated
        });
    });
}

//*******IMAGE PROFILE USER*********
function profileImage(req, res){

    const userId = req.params.id;
    
    if (req.file) {
        if(req.file){
            const file_path = req.file.path;
            const file_split = file_path.split('\\');
            const file_name = file_split[2];
            const ext_split = req.file.originalname.split('\.');
            const file_ext = ext_split[1];
            
            if(file_ext== 'png' || file_ext== 'jpeg' || file_ext== 'jpg'){
                User.findByIdAndUpdate(userId, {image:file_name}, (err, userUpdated) => {
                if(!userUpdated){
                  res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                }else{
                  res.status(200).send({img: userUpdated});
                }
              });
            }else{
             
             return removeFilesOfUploads(res, file_path, 'Extensión no válida!!');
            }
          }else{
            res.status(200).send({message: 'No has subido ninguna imagen..'});
          }
    }
}

function getImgenFile(req, res){
    var image_file = req.params.imageFile;
    var path_file = './public/user/'+image_file;

    //fs.exists(path_file, (exists) =>{
       // if(exists){
           // res.sendFile(path.resolve(path_file));
        ///}else{
        //    return res.status(200).send({message:'no existe la imagen'});
      //  }
    //});
    if (path_file) {
        res.sendFile(path.resolve(path_file));
    }
}
module.exports = {
    
    registerUser,
    loginUser,
    updateUser,
    profileImage,
    getImgenFile

}

