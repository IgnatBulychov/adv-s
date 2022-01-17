
exports.up = function(knex) {
    return knex.schema
    .createTable('networks', function (table) {
      table.string('id').notNullable().primary();
      table.string('title', 255).unique().notNullable();
      table.string('poster', 1024);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable("networks");
  };