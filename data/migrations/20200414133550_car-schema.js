
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {

    tbl.increments();
    //vin, make model, milage
    tbl.integer("vin").unique().notNullable();
    tbl.string("make", 255).index().notNullable();
    tbl.string("model", 255).index().notNullable();
    tbl.integer("mileage").notNullable();

    
    tbl.string("transmission").index();
    tbl.boolean("titleclean").defaultTo(true);

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
