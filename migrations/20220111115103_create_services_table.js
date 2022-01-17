
exports.up = function(knex) {
    return knex.schema
    .createTable('services', function (table) {
      table.string('id').notNullable().primary();
      table.string('title', 255).unique().notNullable();
      table.string('description', 2048);
      table.float('price', 15);    
      table.string('areaId', 32).notNullable()
        .references('areas.id') // ...which references Article PK.
        .onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable("services");
  };