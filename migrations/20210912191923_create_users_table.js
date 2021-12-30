
exports.up = function(knex) {
  return knex.schema
  .createTable('users', function (table) {
    table.string('id').notNullable().primary();
    table.string('email', 255).unique().notNullable();
    table.string('about', 2048);
    table.string('firstName', 255);
    table.string('lastName', 255);
    table.string('avatar', 255);
    table.bool('isSeller', 255);
    table.bool('isBuyer', 255);
    table.string('passwordHash', 255).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("users");
};
