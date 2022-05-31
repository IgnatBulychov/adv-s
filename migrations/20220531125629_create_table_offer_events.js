
exports.up = function(knex) {
  return knex.schema
  .createTable('offer_events', function (table) {
    table.string('id').notNullable().primary();
    table.string('offerId', 255).notNullable()
      .references('offers.id') // ...which references Article PK.
      .onDelete('CASCADE');
    table.string('userId', 255).notNullable()
      .references('users.id') // ...which references Article PK.
      .onDelete('CASCADE');
    table.string('status', 255).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("offer_events");
};
