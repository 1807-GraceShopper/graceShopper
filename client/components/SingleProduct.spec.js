import {expect} from 'chai';
const app = require('../../server');
const agent = require('supertest')(app);
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SingleProduct from './SingleProduct';
import store from '../store/index';
import { Product } from '../../server/db';
const adapter = new Adapter();
enzyme.configure({adapter});

describe('Product routes', () => {
  let storedProducts;

  const productData = [
    {
      name: 'Nike Zoom'
    },
    {
      name: 'Adidas Superstar'
    }
  ];

  beforeEach(async () => {
    const createdProducts = await Product.bulkCreate(productData)
    storedProducts = createdProducts.map(product => product.dataValues);
  });

  describe('GET `/api/products/:id`', () => {
    it('serves up a single Product by its id', async () => {
      const response = await agent.get('/api/campuses/2').expect(200);
      expect(response.body.name).to.equal('Adidas Superstar');
    });
  });
});

describe('Front-end', () => {
  const newProduct = {
    name: 'Manolo Blahnik',
    description: 'Fancy heels'
  }

  describe('<SingleProduct /> component', () => {
    const renderedProduct = shallow(
      <SingleProduct
        product={newProduct}
      />
    );

    // test dynamic rendering
    newProduct.name = 'Stuart Weitzman';

    const renderedNewProduct = shallow(
      <SingleCampus
        campus={newProduct}
      />
    );

    newProduct.name = 'Manolo Blahnik';

    it('should render the name of the product in an h2', () => {
      expect(renderedProduct.find('h2').text()).to.equal('Manolo Blahnik');
      expect(renderedNewProduct.find('h2').text()).to.equal('Stuart Weitzman');
    });
  });

});
