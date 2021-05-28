const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(db => console.log('base de datos conectado'))
    .catch(err => console.log(err));