const Users = require('./users-model')
const { requiredString } = '../global-middleware'

const validateUser = (req, res, next) => {
  const { username } = req.body

  if (!requiredString(username)) {
    return next({ status: 400, message: 'username is required' })
  }
  next()
}

const validateUserId = (req, res, next) => {
  const { user_id } = req.body
  Users.getBy({ user_id }).then((user) => {
    if (!user) {
      next({ status: 400, message: 'user_id could not be found' })
    }
    req.user = user
    return next()
  })
}

module.exports = { validateUser, validateUserId }
