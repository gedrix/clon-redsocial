const express = require('express');
const app = express();
const cors = require('cors');

//conexion a base de datos
require('./db/database');

//cors
app.use(cors());
app.use(express.json());


//cargar ruta
app.use('/api', require('./routes/user'));

app.listen(3000);
console.log('servidor en el puerto', 3000);


/***************** */

