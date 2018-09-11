'use strict'

const db = require('../server/db')
const { User, Category, Product, Order } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: 'tulip56', isAdmin: false})
  ]);

  const categories = await Promise.all([
    Category.create({name: 'sneaker'}),
    Category.create({name: "men's"}),
    Category.create({name: "women's"}),
    Category.create({name: 'dress'})
  ]);
  
  const products = await Promise.all([
    Product.create({name: 'Assassin Sneakers', description: 'Very elaborate sneakers', price: 125.00, quantity: 7, categories: [{ name: 'sneaker' }, { name: "men's" }]}, { include: [ Category ]}),
    Product.create({name: 'Nike M40K1 Size 12', description: 'Nike brand sneakers with shoe size 12', price: 80, quantity: 12, categories: [{ name: "sneaker" }]}, { include: [ Category ]}),
    Product.create({name: 'Ballet Shoes', description: 'Made for ballerinas', price: 30, quantity: 30, categories: [{ name: "women's" }]}, { include: [ Category ]})
  ]);

  const orders = await Promise.all([
    Order.create({price: [125.00, 30], productId: [0, 2], quantity: [1, 2], timeOrdered: new Date(2018, 6, 11, 13, 54, 13, 9), shippingAddress: '999 Mohegan Ave, New London CT', email: 'cody@email.com', userId: 0 }),
    Order.create({price: [80], productId: [1], quantity: [1], timeOrdered: new Date(2018, 6, 14, 12, 10, 55, 31), shippingAddress: '999 Mohegan Ave, New London', email: 'cody@email.com', userId: 0}),
    Order.create({price: [30], productId:[2], quantity: [1], timeOrdered: new Date(2018, 4, 12, 22, 1, 13, 34), shippingAddress: '34 River Drive, Evergreen', email: 'murphy@gmail.com', userId: 1})
  ]);

  const reviews = await Promise.all([
    Review.create({title: 'Worth Spoiling Yourself For', rating: 5, content: new Text('These shoes are very good. Comfortable, durable, very good design. Of course you want to keep them in a safe spot when not using them if you have a disobedient dog, as they do not come cheap!'), productId: 0, userId: 0},
    Review.create({title: 'Substandard', rating: 2, content: new Text("I must ask what exactly are the materials used to make these shoes. They are fairly comfortable, but they degrade very easily; they didn't last for more than 3 months. I would give them a much better rating if they weren't so cheaply made."), productId: 2, userId: 0})),
    Review.create({title: 'Very Charming', rating: 4, content: new Text("In terms of looks, these ballet shoes are very good looking. They are also comfortable too. My niece was delighted to receive them. However, some caution does need to be taken, or else they can wear out easily."), productId: 2, userId: 1})
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${categories.length} categories`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded ${reviews.length} reviews`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
