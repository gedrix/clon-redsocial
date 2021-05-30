const express = require('express'); 
const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');
const multer = require('multer');
const crypto = require('crypto');





//img
const storage = multer.diskStorage({
    destination(req, file, cb) { 
      cb(null, './public/user'); 
    },
    filename(req, file = {}, cb) {
      const { originalname } = file;
      const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + fileExtension);
      });
    },
  });
const md_upload = multer({dest: './public/user',storage});

const api = express.Router();

api.post('/register-user', UserController.registerUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/profile-user/:id', [md_auth.ensureAuth, md_upload.single('image')],UserController.profileImage);




module.exports = api;