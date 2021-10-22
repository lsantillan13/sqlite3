const {options} = require('./options/mariaDB');
const knex = require('knex')(options);

knex.from('products').where('price', '0').update({price: 1})
 .then(() => {console.log('product updated')})
 .catch((err) => { console.log(err); throw err})
 .finally(() => {
     knex.destroy();
 });