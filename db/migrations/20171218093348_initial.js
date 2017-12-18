exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('garage_things', (table) => {
      table.increments('id').primary();
      table.string('itemName');
      table.string('itemReason');
      table.string('itemCleanliness').unsigned();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('garage_things')
  ]);
};
