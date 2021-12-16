const Users = require('./users-model')
const Validate = require('../global-middleware')

const validateUser = (req, res, next) => {
  const { username } = req.body

  const validates = Validate.requiredString(username)

  if (!validates) {
    return next({ status: 400, message: 'username is required' })
  }
  req.user = { username }
  next()
}

const validateUniqueUsername = (req, res, next) => {
  const { username } = req.user

  Users.getBy({ username }).then(([user]) => {
    if (user) {
      return next({ status: 400, message: 'username must be unique' })
    }
    next()
  })
}

const validateUserId = (req, res, next) => {
  const { user_id } = req.params

  Users.getBy({ user_id }).then(([user]) => {
    if (!user) {
      next({ status: 400, message: 'user_id could not be found' })
    }
    req.user = user
    return next()
  })
}

module.exports = { validateUser, validateUniqueUsername, validateUserId }
