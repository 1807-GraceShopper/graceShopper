import chai from 'chai';
const expect = chai.expect;
import chaiThings from 'chai-things';
const app = require('../../../server')
const agent = require('supertest')(app)
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from '../../../client/components/SingleProduct'
import store from '../../../client/store'
import {Product, User} from '../../../server/db/models'

chai.use(chaiThings);

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let storedProducts;
  let administrator;
  beforeEach(async () => {
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
    const adminData = {email: 'cody@exmail.com', password: '123', isAdmin: true };
    storedProducts = await Product.bulkCreate(productData, {returning: true});
    administrator = await User.create(adminData);
  });
  describe('api routes for single product', () => {
    it('GET `/api/products/:id` serves up a single product by its id', async () => {
      const response = await agent.get('/api/products/2').expect(200);
      expect(response.body.name).to.equal('Christian Louboutin');
    })
    
    it('PUT `/api/products/:id` serves an unauthorized message for non-admin user', async () => {
      const newVersion = { name: 'Air Jordans', description: "From what I've heard, a really expensive shoe", price: 1500, imageUrl: "defaultShoe.png", quantity: 2};
      const response = await agent.put('/api/products/1').send(newVersion).expect(401);
      await expect(response.body).to.be.empty;
    })
    context('authorized user', () => {
      before(async() => {
        await agent.post('/auth/login').send(administrator);
      });
      it('PUT `api/products/:id` is successful for admin users', async() => {
        const newVersion = { name: 'Air Jordans', description: "From what I've heard, a really expensive shoe", price: 1500, imageUrl: "defaultShoe.png", quantity: 2};
        const response = await agent.put('api/products/1').send(newVersion).expect(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.equal(1);
        expect(response.body.quantity).to.equal(2);
      })
    })
  })

  describe('front-end for singleProduct', () => {
    let targetProduct = { name: 'Air Jordans',
    description: "From what I've heard, a really expensive shoe",
    price: 1500,
    imageUrl: 'defaultShoe.png'};
    
    const renderedProduct = shallow(
      <SingleProduct singleProduct={targetProduct} user={administrator} />
    );

    //test dyamic rendering
    targetProduct.name = 'Moonwalkers'

    const renderedNewProduct = shallow(
      <SingleProduct singleProduct={targetProduct} user={administrator} />
    );

    targetProduct.name = 'Air Jordans';
    it('should render the name of the product in an h2', () => {
      expect(renderedProduct.find('h2').text()).to.equal('Air Jordans');
      expect(renderedNewProduct.find('h2').text()).to.equal('Moonwalkers');
    })

    it('displays an add product button for admins', () => {
      const wrapper = shallow(
        <SingleProduct singleProduct={targetProduct} user={administrator} />
      )
      const button = wrapper.find('button');
      expect(button.at(0).text()).to.contain('Edit');
    })

    it('does not display an add product button for non-admins', () => {
      const regularUser = { email: 'stag@gmail.com', password: 'uhai76', isAdmin: false };
      const wrapper = shallow(
        <SingleProduct singleProduct={targetProduct} user={regularUser} />
      )
      const button = wrapper.find('button');
      expect(button).to.have.length(0);
    })
  })
})

// describe('Product routes', () => {
//   let storedProducts = 

//   describe('GET `/api/products/:id`', () => {
//     it('serves up a single Product by its id', async () => {
//       const response = await agent.get('/api/products/2').expect(200)
//       expect(response.body.name).to.equal('Christian Louboutin')
//     })
//   })

//   describe('PUT `/api/products/:id`', () => {
//     it('updates a single Product by its id', async () => {
//       const response = await agent
//         .put('/api/products/2')
//         .send({
//           name: 'Prada',
//           description: 'another pair or heels',
//           price: 500,
//           photoUrl: 'defaultShoe.png'
//         })
//         .expect(200)
//       expect(response.body[1][0].name).to.equal('Prada')
//     })
//   })
// })

// describe('Front-end', () => {
//   const newProduct = {
//     name: 'Manolo Blahnik',
//     description: 'Fancy heels'
//   }

//   const users = [
//     {
//       email: 'cody@email.com',
//       isAdmin: true
//     },
//     {
//       email: 'murphy@email.com',
//       isAdmin: false
//     }
//   ]

//   describe('<SingleProduct /> component', () => {
//     const renderedProduct = shallow(
//       <SingleProduct singleProduct={newProduct} user={users[0]} />
//     )

//     // test dynamic rendering
//     newProduct.name = 'Stuart Weitzman'

//     const renderedNewProduct = shallow(
//       <SingleProduct singleProduct={newProduct} user={users[0]} />
//     )

//     newProduct.name = 'Manolo Blahnik'

//     it('should render the name of the product in an h2', () => {
//       expect(renderedProduct.find('h2').text()).to.equal('Manolo Blahnik')
//       expect(renderedNewProduct.find('h2').text()).to.equal('Stuart Weitzman')
//     })

//     it('displays an add product button for admin users', () => {
//       const wrapper = shallow(
//         <SingleProduct singleProduct={newProduct} user={users[0]} />
//       )
//       const button = wrapper.find('button')
//       expect(button.at(0).text()).to.contain('Edit')
//     })

//     it('does not display an add product button for non-admin users', () => {
//       const wrapper = shallow(
//         <SingleProduct singleProduct={newProduct} user={users[1]} />
//       )
//       const button = wrapper.find('button')
//       expect(button).to.have.length(0)
//     })
//   })
// })
