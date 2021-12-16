const db = require('../../data/db-config')

const get = () => {
  return db('users')
}

const getBy = (filter) => {
  return db('users').where(filter)
}

const insert = (user) => {
  return db('users')
    .insert(user)
    .then(([user_id]) => getBy({ user_id }))
}

const update = (user_id, user) => {
  return db('users')
    .update(user)
    .where({ user_id })
    .then(() => getBy({ user_id }))
}

const remove = (user_id) => {
  return db('users')
    .delete()
    .where({ user_id })
    .then(() => user_id)
}

module.exports = {
  get,
  getBy,
  insert,
  update,
  remove,
}
