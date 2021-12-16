// eslint-disable-next-line
exports.seed = (knex, Promise) => {
  return knex('users')
    .truncate()
    .then(() => {
      return knex('users').insert([
        { username: 'jacob' },
        { username: 'emma' },
        { username: 'chance' },
        { username: 'logan' },
      ])
    })
}
