
exports.up = function(knex) {
  return knex.schema
  .createTable('area_location', function (table) {
    table.string('id').notNullable().primary();
    table.string('areaId', 255).notNullable()
      .references('areas.id') // ...which references Article PK.
      .onDelete('CASCADE');
    table.string('locationId', 255).notNullable()
      .references('locations.id') // ...which references Article PK.
      .onDelete('CASCADE');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable("area_location");
};
