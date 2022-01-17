
exports.up = function(knex) {
    return knex.schema
    .createTable('user_area', function (table) {
      table.string('id').notNullable().primary();
      table.string('userId', 255).notNullable();
      table.string('areaId', 255).notNullable().unsigned()
        .references('areas.id') // ...which references Article PK.
        .onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable("user_area");
  };
  