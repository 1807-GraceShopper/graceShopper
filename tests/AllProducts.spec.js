/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from '../client/components/AllProducts'
import store from '../client/store'
import {Product, Category} from '../server/db/models'
const app = require('../server')
const agent = require('supertest')(app)

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Campus routes', () => {
	let storedProducts
	let storedCategories

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

	const categories = [{name: 'womens'}, {name: 'mens'}, {name: 'dress'}]

	beforeEach(async () => {
		const createdProducts = await Product.bulkCreate(products)
		const createdCategories = await Category.bulkCreate(categories)
		storedProducts = createdProducts.map(product => product.dataValues)
		storedCategories = createdCategories.map(
			category => category.dataValues.name
		)
	})

	describe('GET `/api/products`', () => {
		it('serves up all products', async () => {
			const response = await agent.get('/api/products').expect(200)
			expect(response.body).to.have.length(3)
			expect(response.body[0].name).to.equal(storedProducts[0].name)
		})
	})

	describe('POST `/api/products`', () => {
		it('adds a new Product by its id', async () => {
			const response = await agent.post('/api/products').send({name: 'Prada', description: 'another pair or heels', price: 500, photoUrl: 'defaultShoe.png'}).expect(200)
			expect(response.body.name).to.equal('Prada')
		})
	})

	describe('GET /api/categories', () => {
		it('serves up all categories', async () => {
			const response = await agent.get('/api/categories').expect(200)
			expect(response.body[0].name).to.equal(storedCategories[0])
		})
	})

	describe('<AllProducts /> component', () => {
		it('renders an unordered list', () => {
			const wrapper = shallow(
				<AllProducts
					categories={storedCategories}
					products={products}
					user={users[0]}
				/>
			)
			expect(wrapper.find('ul')).to.have.length(1)
		})

		it('renders list items for the campuses passed in as props', () => {
			//we are creating the campuses in the database so the extra credit in tier-4 doesn't break this spec.
			const wrapper = shallow(
				<AllProducts
					products={products}
					categories={storedCategories}
					user={users[0]}
				/>
			)
			const listItems = wrapper.find('li')
			expect(listItems).to.have.length(3)
			expect(listItems.at(2).text()).to.contain('A more moderate shoe')
		})
		it('renders option items for the categories', () => {
			//we are creating the campuses in the database so the extra credit in tier-4 doesn't break this spec.
			const wrapper = shallow(
				<AllProducts
					products={products}
					categories={storedCategories}
					user={users[0]}
				/>
			)
			const listItems = wrapper.find('option')
			expect(listItems).to.have.length(4)
		})
		it('displays an add product button for admin users', () => {
			const wrapper = shallow(
				<AllProducts
					products={products}
					categories={storedCategories}
					user={users[0]}
				/>
			)
			const buttons = wrapper.find('button')
			expect(buttons.at(1).text()).to.contain('Add')
		})
		it('does not display an add product button for non-admin users', () => {
			const wrapper = shallow(
				<AllProducts
					products={products}
					categories={storedCategories}
					user={users[1]}
				/>
			)
			const buttons = wrapper.find('button')
			expect(buttons).to.have.length(1)
			expect(buttons.at(0).text()).to.contain('Select')
		})
	})
})
