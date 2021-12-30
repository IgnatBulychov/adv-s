
exports.up = function(knex) {
  return knex.schema
  .createTable('offers', function (table) {
    table.string('id').notNullable().primary();
    table.string('title', 255).notNullable();
    table.string('description', 255);
    table.string('image', 255);
    table.int('numberOfClicks');
    table.int('realNumberOfClicks');
    table.int('numberOfSales');
    table.string('sellerId', 255).notNullable();
    table.string('buyerId', 255).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("offers");
};
