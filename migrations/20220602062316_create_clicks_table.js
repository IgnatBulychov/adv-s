
exports.up = function(knex) {
  return knex.schema
  .createTable('clicks', function (table) {
    table.string('id').notNullable().primary();
    table.string('offerId', 255).notNullable()
      .references('offers.id') // ...which references Article PK.
      .onDelete('CASCADE');
    table.string('ip', 255);
    table.boolean('isDouble');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("clicks");
};
