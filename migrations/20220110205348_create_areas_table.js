
exports.up = function(knex) {
    return knex.schema
    .createTable('areas', function (table) {
      table.string('id').notNullable().primary();
      table.string('title', 255).notNullable();
      table.string('description', 2048);
      table.string('poster', 1024);    
      table.bigint('numberOfFollowers', 15);
      table.string('networkId', 32).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable("areas");
  };