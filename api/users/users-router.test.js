const request = require('supertest')
const server = require('../server')
const db = require('../../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

it('is the correct env', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('users router', () => {
  describe('[GET] /api/users', () => {
    let res

    beforeEach(async () => {
      res = await request(server).get('/api/users')
    })

    it('responds with 200 OK', async () => {
      expect(res.status).toBe(200)
    })

    it('responds with all users', async () => {
      expect(res.body).toHaveLength(4)
    })
  })

  describe('[GET] /api/users/:user_id', () => {
    let res

    beforeEach(async () => {
      res = await request(server).get('/api/users/1')
    })

    it('responds with 200 OK', () => {
      expect(res.status).toBe(200)
    })

    it('responds with single user', () => {
      expect(res.body).toMatchObject({ user_id: 1, username: 'jacob' })
    })
  })

  describe('[POST] /api/users', () => {
    let res

    const larry = { username: 'larry' }

    beforeEach(async () => {
      res = await request(server).post('/api/users').send(larry)
    })

    it('responds with 201 CREATED', async () => {
      expect(res.status).toBe(201)
    })

    it('responds with new user', async () => {
      expect(res.body).toMatchObject({ ...larry, user_id: 5 })
    })
  })

  describe('[PUT] /api/users/:user_id', () => {
    let res

    const henry = { username: 'henry' }

    beforeEach(async () => {
      res = await request(server).put('/api/users/1').send(henry)
    })

    it('responds with 200 OK', async () => {
      expect(res.status).toBe(200)
    })

    it('responds with updated user', async () => {
      expect(res.body).toMatchObject({ ...henry, user_id: 1 })
    })
  })

  describe('[DELETE] /api/users/:user_id', () => {
    let res

    beforeEach(async () => {
      res = await request(server).delete('/api/users/1')
    })

    it('responds with 200 OK', async () => {
      expect(res.status).toBe(200)
    })

    it('responds with new hobbit', async () => {
      expect(res.body).toMatchObject({ user_id: 1 })
    })
  })
})
