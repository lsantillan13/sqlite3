const {options3} = require('./options/sqlite3.js');
const knex = require('knex')(options3);

const articulosA = [
    {nombre: 'asd', codigo: 'CELU', precio: 12499.99, stock: 5000},
    {nombre: 'dsa', codigo: 'TV', precio: 27999.99, stock: 300},
    {nombre: 'sda', codigo: 'NOTE', precio: 48200.12, stock: 1500},
    {nombre: 'dsa', codigo: 'TAB', precio: 3000.00, stock: 200},
    {nombre: 'asd', codigo: 'RATON', precio: 1009.50, stock: 13200}
];


module.exports = funcion = (async ()=>{
    try {
         await knex.schema.dropTableIfExists('messages');
         console.log('Tabla borrada...');

        await knex.schema.createTable('messages', table => {
                table.increments('id'),
                table.string('nombre'),
                table.string('codigo'),
                table.float('precio'),
                table.integer('stock')
            });
        console.log('Tabla de productos creada...');

        await knex('messages').insert(articulosA);
        console.log('Articulos insertados...');

        let articulos = await knex.from('messages').select('*');
        console.log('Listando articulos...');
        for (let articulo of articulos) {
            console.log(`${articulo['id']}. ${articulo['codigo']} - ${articulo['nombre']}. Precio: $${articulo['precio']} - Stock: ${articulo['stock']}`);
        }

        await knex.from('messages').where('id', '=', 3).del();
        console.log('Articulo borrado...');

        await knex.from('messages').where('id', '=', 2).update({stock: 0});
        console.log('Articulo actualizado...');

        articulos = await knex.from('messages').select('*');
        console.log('Listando articulos finales...');
        for (let articulo of articulos) {
            console.log(`${articulo['id']}. ${articulo['codigo']} - ${articulo['nombre']}. Precio: $${articulo['precio']} - Stock: ${articulo['stock']}`);
        }
        knex.destroy();
    }

    catch(e) {
        console.log('Error en proceso:', e);
        knex.destroy();
    }
})();
