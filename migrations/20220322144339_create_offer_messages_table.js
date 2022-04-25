
exports.up = function(knex) {
  return knex.schema
  .createTable('offer_messages', function (table) {
    table.string('id').notNullable().primary();
    table.string('text', 4096).notNullable();
    table.string('offerId', 255).notNullable()
      .references('offers.id') // ...which references Article PK.
      .onDelete('CASCADE');
    table.string('from', 255).notNullable();
    table.string('to', 255).notNullable();
    table.boolean('isViewed', 255);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("offer_messages");
};
