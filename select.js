const {options} = require('./options/mariaDB');
const knex = require('knex')(options);

// knex.from('products').select('id')
// knex.from('products').select('name')
// knex.from('products').select('price')
// knex.from('products').select('thumbnail')
knex.from('products').select('*')
 .then((rows) => {
     for (row of rows){
         console.log(`${row['id']}  ${row['name']}  ${row['price']}`);
     }
 }).catch((err) => {console.log(err); throw err})
  .finally(() => {
    knex.destroy();
   });