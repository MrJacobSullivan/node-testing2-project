exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id')
    table.string('username', 128).unique().notNullable()
  })
}

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users')
}
