const {options} = require('./options/mariaDB');
const knex = require('knex')(options);

const {arr} = require('./server');

// const productos = [
//     {name: 'Producto 0', price: 0, thumbnail: 'this',},
//     {name: 'Producto 0', price: 0, thumbnail: 'this',},
//     {name: 'Producto 0', price: 0, thumbnail: 'this',},
//     {name: 'Producto 0', price: 0, thumbnail: 'this',},
//     {name: 'Producto 0', price: 0, thumbnail: 'this',},
// ];

knex('products').insert(arr)
 .then(() => {
     console.log('Filas insertadas');
     knex.destroy();
 })
 .catch(e => {
    console.log('Ocurrio un error:', e);
    knex.destroy();
 })