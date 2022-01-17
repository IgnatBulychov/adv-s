
exports.up = function(knex) {
    return knex.schema
    .createTable('category_area', function (table) {
      table.string('id').notNullable().primary();
      table.string('categoryId', 255).notNullable();
      table.string('areaId', 255).notNullable()
        .references('areas.id') // ...which references Article PK.
        .onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable("category_area");
  };
  