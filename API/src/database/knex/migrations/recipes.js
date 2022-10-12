
exports.up = knex => knex.schema.createTable('recipes', table => {
    table.increments('id')
    table.text('name').references('name').inTable('dishes')
    table.integer('id_dish').references('id').inTable('dishes').onDelete('CASCADE')
    table.integer('id_ingredient').references('id').inTable('ingredient').onDelete('CASCADE')
}) 

exports.down = knex => knex.schema.dropTable('recipes') 
