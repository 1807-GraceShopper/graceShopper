import {expect} from 'chai'
const app = require('../server')
const agent = require('supertest')(app)
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from '../client/components/SingleProduct'
import store from '../client/store'
import {Product} from '../server/db/models'
const adapter = new Adapter()
enzyme.configure({adapter})

describe('Product routes', () => {
  let storedProducts

  describe('GET `/api/products/:id`', () => {
    it('serves up a single Product by its id', async () => {
      const response = await agent.get('/api/products/2').expect(200)
      expect(response.body.name).to.equal('Christian Louboutin')
    })
  })

  describe('PUT `/api/products/:id`', () => {
    it('updates a single Product by its id', async () => {
      const response = await agent
        .put('/api/products/2')
        .send({
          name: 'Prada',
          description: 'another pair or heels',
          price: 500,
          photoUrl: 'defaultShoe.png'
        })
        .expect(200)
      expect(response.body[1][0].name).to.equal('Prada')
    })
  })
})

describe('Front-end', () => {
  const newProduct = {
    name: 'Manolo Blahnik',
    description: 'Fancy heels'
  }

  const users = [
    {
      email: 'cody@email.com',
      isAdmin: true
    },
    {
      email: 'murphy@email.com',
      isAdmin: false
    }
  ]

  describe('<SingleProduct /> component', () => {
    const renderedProduct = shallow(
      <SingleProduct singleProduct={newProduct} user={users[0]} />
    )

    // test dynamic rendering
    newProduct.name = 'Stuart Weitzman'

    const renderedNewProduct = shallow(
      <SingleProduct singleProduct={newProduct} user={users[0]} />
    )

    newProduct.name = 'Manolo Blahnik'

    it('should render the name of the product in an h2', () => {
      expect(renderedProduct.find('h2').text()).to.equal('Manolo Blahnik')
      expect(renderedNewProduct.find('h2').text()).to.equal('Stuart Weitzman')
    })

    it('displays an add product button for admin users', () => {
      const wrapper = shallow(
        <SingleProduct singleProduct={newProduct} user={users[0]} />
      )
      const button = wrapper.find('button')
      expect(button.at(0).text()).to.contain('Edit')
    })

    it('does not display an add product button for non-admin users', () => {
      const wrapper = shallow(
        <SingleProduct singleProduct={newProduct} user={users[1]} />
      )
      const button = wrapper.find('button')
      expect(button).to.have.length(0)
    })
  })
})
