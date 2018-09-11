import {expect} from 'chai'
const app = require('../../server')
const agent = require('supertest')(app)
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './SingleProduct'
import store from '../store/index'
import {Product} from '../../server/db/models'
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
})

describe('Front-end', () => {
  const newProduct = {
    name: 'Manolo Blahnik',
    description: 'Fancy heels'
  }

  describe('<SingleProduct /> component', () => {
    const renderedProduct = shallow(
      <SingleProduct singleProduct={newProduct} />
    )

    // test dynamic rendering
    newProduct.name = 'Stuart Weitzman'

    const renderedNewProduct = shallow(
      <SingleProduct singleProduct={newProduct} />
    )

    newProduct.name = 'Manolo Blahnik'

    it('should render the name of the product in an h2', () => {
      expect(renderedProduct.find('h2').text()).to.equal('Manolo Blahnik')
      expect(renderedNewProduct.find('h2').text()).to.equal('Stuart Weitzman')
    })
  })
})
