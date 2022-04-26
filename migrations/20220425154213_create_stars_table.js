
exports.up = function(knex) {
  return knex.schema
  .createTable('stars', function (table) {
    table.string('id').notNullable().primary();
    table.string('authorId', 255).notNullable();
    table.string('offerId', 255).notNullable()
      .references('offers.id') // ...which references Article PK.
      .onDelete('CASCADE');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("stars");
};
