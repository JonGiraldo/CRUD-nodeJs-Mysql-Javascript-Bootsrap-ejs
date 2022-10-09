const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares (funciones).
// Respuestas a peticiones por consola.
app.use(morgan('dev'));

// conexion a la base de datos.
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));
// desde el modulo express requrimos un metodo que nos permite poder entender todos lo datos que vengan desde el formulario
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));


// starting the server
app.listen(app.get('port'), () => {
    console.log('server on port 3000');
});