const {options} = require('./options/mariaDB');
const knex = require('knex')(options);

knex.from('products').del()
 .then(() => console.log('products succesfully deleted'))
 .catch((err) => {console.log(err); throw err})
 .finally(() =>{
     knex.destroy();
 });