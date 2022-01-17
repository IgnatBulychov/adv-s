
exports.up = function(knex) {
    return knex.schema
    .createTable('offers', function (table) {
      table.string('id').notNullable().primary();    
      table.string('sellerId', 32).notNullable();
      table.string('buyerId', 32).notNullable();
      table.string('serviceId', 32).notNullable();;
      table.string('comment', 2048);
      table.bigint('quantity', 15).notNullable();;
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable("offers");
  };
  