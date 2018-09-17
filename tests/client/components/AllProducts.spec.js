import chai from 'chai';
const expect = chai.expect;
import chaiThings from 'chai-things';
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from '../../../client/components/AllProducts'
import {AddCategory} from '../../../client/components/AddCategory'
import store from '../../../client/store';
import {Product, Category, User} from '../../../server/db/models'
const app = require('../../../server')
const agent = require('supertest')(app)
import AllProductsList from '../../../client/components/AllProductsList'

chai.use(chaiThings);

const adapter = new Adapter()
enzyme.configure({adapter})

describe('All Products', () => {
  let products;
  let categories;
  let admin;
  const productData = [
    { name: 'Air Jordans',
    description: "From what I've heard, a really expensive shoe",
    price: 1500,
    imageUrl: 'defaultShoe.png'},
    { name: 'Christian Louboutin',
    description: 'Also a very expensive shoe',
    price: 800,
    imageUrl: 'defaultShoe.png' },
    { name: 'Nike',
    description: 'A more moderate shoe',
    price: 70,
    imageUrl: 'defaultShoe.png' }
  ];
  const categoryData = [{name: 'womens'}, {name: 'mens'}, {name: 'dress'}];
  const adminData = {email: 'cody@exmail.com', password: '123', isAdmin: true };

  describe('/api/products w/out authorization', () => {
    before(async () => {
      products = await Product.bulkCreate(productData, {returning: true});
      categories = await Category.bulkCreate(categoryData, {returning: true});
    })
    it('GET /api/products returns all products from database', async() => {
      const response = await agent.get('/api/products').expect(200)
      expect(response.body).to.have.length(6);
      expect(response.body).to.equal(products);
    })
    it('POST /api/products/ should return 401 response with unauthorized user', async() => {
      const newProduct = { name: 'Caligula', description: 'Named after the infamous emperor', price: 300, imageUrl: 'defaultShoe.png' };
      const response = await agent.post('/api/products').send(newProduct).expect(401)
      await expect(response.body).to.be.empty;
    });
  })

  describe('/api/products WITH authorization', () => {
    const newProduct = { name: 'Caligula', description: 'Named after the infamous emperor', price: 300, imageUrl: 'defaultShoe.png' };
    before(async () => {
        products = await Product.bulkCreate(productData, {returning: true});
        categories = await Category.bulkCreate(categoryData, {returning: true});
        admin = await User.create(adminData);
        await agent.post('/auth/login').send(admin);
    })
    it('POST /api/products is successful if user is an admin', async() => {
      const response = await agent.post('/api/products').send(newProduct).expect(201)
      expect(response.body).to.be.an('object');
      await expect(response.body.id).to.not.be.undefined;
    });
    it('PUT /api/products/:id is successful if user is an admin', async() => {
      const updatedProduct = { name: 'Caligula', description: 'Named after the infamous emperor', price: 310, imageUrl: 'defaultShoe.png', quantity: 3, categories:[categories[2]] };
      const product = await Product.create(newProduct);
      const response = await agent.put(`/api/products/${product.id}`).send(updatedProduct).expect(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.equal(product.id);
      expect(response.body.name).to.equal('Caligula');
    })
    it('DELETE /api/products/:id is successful if user is an admin', async() => {
      await agent.delete('/api/products/1').expect(200);
      const response = await agent.get('/api/products/1');
      expect(response.body).to.equal(null);
    })
  });

  describe('categories route', () => {
    before(async () => {
      products = await Product.bulkCreate(productData, {returning: true});
      categories = await Category.bulkCreate(categoryData, {returning: true});
      admin = await User.create(adminData);
      await agent.post('/auth/login').send(admin);
    })
    it('GET /api/categories serves up all categories', async () => {
      const response = await agent.get('/api/categories').expect(200)
      expect(response.body).to.have.length(3);
      expect(response.body).to.equal(categories);
    })
    it('POST /api/categories as an admin user', async () => {
      const newCat = { name: 'fantasy'};
      const response = await agent.post('/api/categories').send(newCat).expect(201)
      expect(response.body).to.be.an('object');
      await expect(response.body.id).to.not.be.undefined;
    })
  })

  describe('front-end', () => {
    describe('<AllProductsList /> component', () => {
      before(async () => {
        products = await Product.bulkCreate(productData, {returning: true});
        categories = await Category.bulkCreate(categoryData, {returning: true});
        admin = await User.create(adminData);
      })
      it('renders an unordered list', () => {
        const wrapper = shallow(
          <AllProductsList
            products={products}
            handleDelete={categories}
            user={admin}
          />
        );
        const listItems = wrapper.find('li');
        expect(listItems).to.have.length(3);
        expect(listItems.at(2).text()).to.contain('A more moderate shoe')
      })
      it('displays an add product button for admin users', () => {
        const wrapper = shallow(
          <AllProductsList
            products={products}
            handleDelete={categories}
            user={admin}
          />
        );
        const buttons = wrapper.find('button');
        expect(buttons).to.have.length(1);
      })
      it('does not display an add product button for non admin users', async () => {
        const nonAdmin = await User.create({email: 'chewie@gmail.com', password: 'tulip56', isAdmin: false});
        const wrapper = shallow(
          <AllProductsList
            products={products}
            handleDelete={categories}
            user={nonAdmin}
          />
        );
        const buttons = wrapper.find('button');
        expect(buttons).to.have.length(0);
      })
    })
  });
})