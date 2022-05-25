
exports.up = function(knex) {
  return knex.schema
    .createTable('offers', function (table) {
      table.string('id').notNullable().primary();    
      table.string('areaId', 32).notNullable();
      table.string('buyerId', 32).notNullable();
      table.string('sellerId', 32).notNullable();
      table.string('status', 256).notNullable();
      //table.string('serviceId', 32).notNullable();
      table.bigint('quantity', 15).notNullable();      
      table.string('title', 1024).notNullable();
      table.string('image', 1024);
      table.string('text', 4048).notNullable();
      table.string('link', 2048).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable("offers");
  };
  