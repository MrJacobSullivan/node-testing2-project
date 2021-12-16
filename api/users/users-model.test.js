const db = require('../../data/db-config')
const Users = require('./users-model')

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

describe('users model', () => {
  describe('get', () => {
    it('resolves all users in users table', async () => {
      const result = await Users.get()
      expect(result).toHaveLength(4)
    })
  })

  describe('getBy', () => {
    it('resolves a user with given user_id', async () => {
      const result = await Users.getBy({ user_id: 1 })
      expect(result).toMatchObject({ user_id: 1, username: 'jacob' })
    })

    it('resolves a user with given username', async () => {
      const result = await Users.getBy({ username: 'jacob' })
      expect(result).toMatchObject({ user_id: 1, username: 'jacob' })
    })
  })

  describe('insert', () => {
    it('creates a new user in db', async () => {
      await Users.insert({ username: 'larry' })
      const [larry] = await db('users').where({ user_id: 5 })
      expect(larry).toMatchObject({ user_id: 5, username: 'larry' })
    })

    it('resolves the new user with user_id, username', async () => {
      const result = await Users.insert({ username: 'larry' })
      expect(result).toMatchObject({ user_id: 5, username: 'larry' })
    })
  })

  describe('update', () => {
    it('updates a user in db', async () => {
      await Users.update(1, { username: 'henry' })
      const [henry] = await db('users').where({ user_id: 1 })
      expect(henry).toMatchObject({ user_id: 1, username: 'henry' })
    })

    it('resolves the updated user with user_id, username', async () => {
      const result = await Users.update(1, { username: 'henry' })
      expect(result).toMatchObject({ user_id: 1, username: 'henry' })
    })
  })

  describe('remove', () => {
    it('removes a user in db', async () => {
      await Users.remove(4)
      const users = await Users.get()
      expect(users).toHaveLength(3)
      users.forEach((user) => {
        expect(user).not.toMatchObject({ user_id: 4, username: 'logan' })
      })
    })

    it('resolves the deleted user_id', async () => {
      const result = await Users.remove(4)
      expect(result).toBe(4)
    })
  })
})
