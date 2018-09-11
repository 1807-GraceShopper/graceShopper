/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './AllProducts'
import store from '../store/index'
import {Product} from '../../server/db'
const app = require('../../server')
const agent = require('supertest')(app)

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Campus routes', () => {
	let storedProducts

	const products = [
		{
			name: 'Air Jordans',
			description: "From what I've heard, a really expensive shoe",
			price: 1500,
			imageUrl: 'defaultShoe.png'
		},
		{
			name: 'Christian Louboutin',
			description: 'Also a very expensive shoe',
			price: 800,
			imageUrl: 'defaultShoe.png'
		},
		{
			name: 'Nike',
			description: 'A more moderate shoe',
			price: 70,
			imageUrl: 'defaultShoe.png'
		}
	]

	beforeEach(async () => {
		const createdProducts = await Product.bulkCreate(products)
		storedProducts = createdProducts.map(product => product.dataValues)
	})

	describe('GET `/api/products`', () => {
		it('serves up all products', async () => {
			const response = await agent.get('/api/products').expect(200)
			expect(response.body).to.have.length(3)
			expect(response.body[0].name).to.equal(storedProducts[0].name)
		})
	})

	describe('<AllProducts /> component', () => {
		it('renders an unordered list', () => {
			const wrapper = shallow(
				<AllProducts store={store} products={products} />
			)
			expect(wrapper.find('ul')).to.have.length(1)
		})

		it('renders list items for the campuses passed in as props', () => {
			//we are creating the campuses in the database so the extra credit in tier-4 doesn't break this spec.
			const wrapper = shallow(
				<AllProducts store={store} products={products} />
			)
			const listItems = wrapper.find('li')
			console.log('list items', listItems)
			expect(listItems).to.have.length(3)
			expect(listItems.at(2).text()).to.contain('A more moderate shoe')
		})
	})
})
