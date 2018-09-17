/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')

const db = require('../../../server/db')
const app = require('../../../server/index')

const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    let user;
    const authRequest = request.agent(app);
    beforeEach(async () => {
      user = {
        email: codysEmail,
        password: 'bones',
        isAdmin: true
      };
      await User.create(user);
      await authRequest.post('/auth/login').send(user); //causes circular json error
    })

    it('GET /api/users', async () => {
      const res = await authRequest
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
