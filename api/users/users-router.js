const router = require('express').Router()

const Users = require('./users-model')
const { validateUser, validateUserId } = require('./users-middleware')

// [GET] /api/users
router.get('/', (res, req, next) => {})

// [GET] /api/users/:id
router.get('/:id', validateUserId, (res, req, next) => {})

// [POST] /api/users
router.post('/', validateUserId, (res, req, next) => {})

// [PUT] /api/users/:id
router.put('/:id', [validateUser, validateUserId], (res, req, next) => {})

// [DELETE] /api/users/:id
router.delete('/:id', validateUserId, (res, req, next) => {})

module.exports = router
