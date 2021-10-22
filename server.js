
module.exports = arr = [];

/* Instructions  */
const express = require('express');
const router = require('./Router/Router.js');
const handlebars = require('express-handlebars');

const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

/*Knex for database*/
const {options} = require('./options/mariaDB');
const knex = require('knex')(options);
/*Sqlite3*/
const {options3} = require('./sqlite/options/sqlite3.js')

/*Server up*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 8080);
http.listen(app.get('port'), () => { console.log('server on port',  app.get('port')); });

/*Router*/
const Rutas = require('./Rutas/Routes.js');
const { Socket } = require('socket.io');
const rutas = new Rutas();
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'Public')));

/* Handlebars */
app.engine(
    "hbs",
    handlebars({
     extname: ".hbs",
     defaultLayout: 'index.hbs',
     layoutsDir: __dirname + "/Views/layouts",
     partialsDir: __dirname + "/Views/partials"
    })
);
app.set("view engine", "hbs");
app.set("views", "./Views");

/*WebSocket*/

/*var*/ let mensajes = [];
/*funct*/ const fakeAPI = () => { return arr };
/*var*/let msj = {Productos: fakeAPI(), listExist: arr.length != 0 ? true : false};

io.on('connection', (socket) => {
    console.log('alguien se está conectando');

    //Recibo producto
    socket.on('products:send', (data) => { console.log(data); io.sockets.emit('products:send', data) });

    //Guardado de productos
    socket.on('products:db', (data) => {
     const newArr = [];
     newArr.push(data);
     /*Persistencia en MariaDB*/
        knex('products').insert(newArr)
         .then(() => { console.log('Filas insertadas'); knex.destroy(); })
         .catch(e => { console.log('Ocurrio un error:', e); knex.destroy(); })
    });

    //Envio de mensaje al cliente
    socket.on('message:send', (data) => {io.sockets.emit('message:send', data)});

    //Guardado de mensajes
    /*  */
    socket.on('messages:db', (data) => {
     /*arr*/
     const messageArr = [];
     messageArr.push({data});
     console.log(messageArr)
        /**/
        // knex.schema.createTable('messages', table =>{
        //     table.increments('id');
        //     table.string('username');
        //     table.string('message');
        // }).then(() =>{
        //     console.log('tabla creada')
        //     knex.destroy();
        // }).catch((err) => {console.log(err); throw err});

        /**/
        knex('messages').insert({...messageArr});
        console.log('Filas insertadas')


        knex.from('messages').select('*')
        .then((rows) => {
            console.log('listando mensajes');
            for (row of rows){console.log(`${row['id']} - Usuario: ${row['username']} | Mensaje: ${row['message']}`);}
        }).catch((err) => {console.log(err); throw err})
        .finally(() => {
        knex.destroy();
        });
    })

    //El cliente esta escribiendo
    socket.on('chat:typing', (data) => { socket.broadcast.emit('chat:typing', data); });
});
