
exports.up = function(knex) {
  return knex.schema
  .createTable('categories', function (table) {
    table.string('id').notNullable().primary();
    table.string('title', 255).unique().notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("categories");
};