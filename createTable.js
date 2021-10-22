const {options} = require('./options/mariaDB');
const knex = require('knex')(options);
const {arr} = require('./server');
console.log(arr);

knex.schema.createTable('products', table => {
    table.increments('id');
    table.string('title');
    table.integer('price');
    table.string('thumbnail');
})

.then(() => {
    console.log('Tabla creada')
    knex.destroy();
})
.catch(e => {
    console.log('Ha ocurrido un error:', e);
    knex.destroy();
})