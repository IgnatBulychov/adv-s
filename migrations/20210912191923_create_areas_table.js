
exports.up = function(knex) {
  return knex.schema
  .createTable('areas', function (table) {
    table.string('id').notNullable().primary();
    table.string('title', 255).notNullable();
    table.string('description', 255).notNullable();
    table.string('poster', 255).notNullable();
    table.string('networkId', 255).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("areas");
};