import chai from 'chai'
const expect = chai.expect
import chaiThings from 'chai-things'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from '../client/components/AllProducts'
import {AddCategory} from '../client/components/AddCategory'
import store from '../client/store'
import {Product, Category, User} from '../server/db/models'
import db from '../server/db/db'
const app = require('../server')
const request = require('supertest')
import AllProductsList from '../client/components/AllProductsList'

chai.use(chaiThings)

const adapter = new Adapter()
enzyme.configure({adapter})
describe('All Products', () => {
  beforeEach('Synchronize the model', () => db.sync({force: true}))
  const products = [
    {
      name: 'Air Jordans',
      description: "From what I've heard, a really expensive shoe",
      price: 1500,
      imageUrl: 'defaultShoe.png',
      quantity: 1
    },
    {
      name: 'Christian Louboutin',
      description: 'Also a very expensive shoe',
      price: 800,
      imageUrl: 'defaultShoe.png',
      quantity: 2
    },
    {
      name: 'Nike',
      description: 'A more moderate shoe',
      price: 70,
      imageUrl: 'defaultShoe.png',
      quantity: 5
    }
  ]
  const categories = [{name: 'womens'}, {name: 'mens'}, {name: 'dress'}]
  const admin = {email: 'cody@exmail.com', password: '123', isAdmin: true}

  //add describe block here and then do beforeEach bulkCreate here?
  describe('/api/products w/out authorization', () => {
    beforeEach(async () => {
      await Product.bulkCreate(products, {returning: true})
      await Category.bulkCreate(categories, {returning: true})
    })
    it('GET /api/products returns all products from database', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200)
      expect(response.body).to.have.length(3)
    })
    it('POST /api/products/ should return 401 response with unauthorized user', async () => {
      const newProduct = {
        name: 'Caligula',
        description: 'Named after the infamous emperor',
        price: 300,
        imageUrl: 'defaultShoe.png'
      }
      await Product.create(newProduct)
      const response = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(401)
      await expect(response.body).to.equal(
        'User must be admin to access this feature.'
      )
    })
  })

  describe('/api/products WITH authorization', () => {
    let newProduct
    const authRequest = request.agent(app)
    beforeEach(async () => {
      newProduct = {
        name: 'Caligula',
        description: 'Named after the infamous emperor',
        price: 300,
        imageUrl: 'defaultShoe.png',
        quantity: 0
      }
      await Product.bulkCreate(products, {returning: true})
      await Category.bulkCreate(categories, {returning: true})
      await User.create(admin)
      await authRequest.post('/auth/login').send(admin)
    })
    it('POST /api/products is successful if user is an admin', async () => {
      const response = await authRequest
        .post('/api/products')
        .send(newProduct)
        .expect(200)
      expect(response.body).to.be.an('object')
      await expect(response.body.id).to.not.be.undefined
    })
    it('PUT /api/products/:id is successful if user is an admin', async () => {
      const updatedProduct = {
        name: 'Caligula',
        description: 'Named after the infamous emperor',
        price: 310,
        imageUrl: 'defaultShoe.png',
        quantity: 3
      }
      const product = await Product.create(newProduct)
      await authRequest
        .put(`/api/products/${product.id}`)
        .send(updatedProduct)
        .expect(200)
      const response = await Product.findById(product.id)
      // expect(response.body).to.be.an('object');
      // expect(response.body.id).to.equal(product.id);
      // expect(response.body.quantity).to.equal(3);
    })
    it('DELETE /api/products/:id is successful if user is an admin', async () => {
      await authRequest.delete('/api/products/1').expect(200)
      const response = await request(app).get('/api/products/1')
      expect(response.body).to.equal(null)
    })
  })

  describe('categories route', () => {
    const authRequest = request.agent(app)
    beforeEach(async () => {
      await Product.bulkCreate(products, {returning: true})
      await Category.bulkCreate(categories, {returning: true})
      await User.create(admin)
      await authRequest.post('/auth/login').send(admin)
    })
    it('GET /api/categories serves up all categories', async () => {
      const response = await authRequest.get('/api/categories').expect(200)
      expect(response.body).to.have.length(3)
    })
    it('POST /api/categories as an admin user', async () => {
      const newCat = {name: 'fantasy'}
      const response = await authRequest
        .post('/api/categories')
        .send(newCat)
        .expect(200)
      expect(response.body).to.be.an('object')
      await expect(response.body.id).to.not.be.undefined
    })
  })

  describe('front-end', () => {
    describe('<AllProductsList /> component', () => {
      beforeEach(async () => {
        await Product.bulkCreate(products, {returning: true})
        await Category.bulkCreate(categories, {returning: true})
        await User.create(admin)
      })

      it('does not display an add product button for non admin users', async () => {
        const nonAdmin = {
          email: 'chewie@gmail.com',
          password: 'tulip56',
          isAdmin: false
        }
        await User.create(nonAdmin)
        const wrapper = shallow(
          <AllProductsList
            products={products}
            handleDelete={categories}
            user={nonAdmin}
          />
        )
        const buttons = wrapper.find('button')
        expect(buttons).to.have.length(0)
      })
    })
  })
})
