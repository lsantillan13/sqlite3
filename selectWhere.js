const {options} = require('./options/mariaDB');
const knex = require('knex')(options);

knex.from('products').select('id', 'name', 'price').where('price', '<', 4000)
 .then( rows =>{
     for (row of rows){
         console.log(`${row['id']}, Nombre: ${row['name']} - Precio: ${row['price']}`);
     }
     knex.destroy();
 })
 .catch((err) => {
     console.log('Error en la selección', err);
     knex.destroy();
 });