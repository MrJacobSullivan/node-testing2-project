const express = require('express')

const usersRouter = require('./users/users-router')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' })
})

server.use('/api/users', usersRouter)

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = server
