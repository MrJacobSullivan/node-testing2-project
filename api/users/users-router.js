const router = require('express').Router()

const Users = require('./users-model')
const { validateUser, validateUniqueUsername, validateUserId } = require('./users-middleware')

// [GET] /api/users
router.get('/', (req, res, next) => {
  Users.get()
    .then((users) => {
      res.json(users)
    })
    .catch(next)
})

// [GET] /api/users/:user_id
router.get('/:user_id', validateUserId, (req, res) => res.json(req.user))

// [POST] /api/users
router.post('/', [validateUser, validateUniqueUsername], (req, res, next) => {
  const user = req.user

  Users.insert(user)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(next)
})

// [PUT] /api/users/:user_id
router.put(
  '/:user_id',
  [validateUser, validateUniqueUsername, validateUserId],
  (req, res, next) => {
    const { user_id } = req.params
    const user = req.body

    Users.update(user_id, user)
      .then((user) => {
        res.json(user)
      })
      .catch(next)
  }
)

// [DELETE] /api/users/:user_id
router.delete('/:user_id', validateUserId, (req, res, next) => {
  const { user_id } = req.params

  Users.remove(user_id)
    .then((user_id) => {
      res.json({ user_id })
    })
    .catch(next)
})

module.exports = router
