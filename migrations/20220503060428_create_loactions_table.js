
exports.up = function(knex) {
  return knex.schema
  .createTable('locations', function (table) {
    table.string('id').notNullable().primary();
    table.string('fiasCode', 255).unique().notNullable();
    table.string('locality', 255).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("locations");
};
  