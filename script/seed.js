'use strict'

const db = require('../server/db')
const {User, Category, Product, Order, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: 'tulip56',
      isAdmin: false
    })
  ])

  const categoryData = [
    { name: "sneaker" },
    { name: "men's" },
    { name: "women's" },
    { name: "dress" },
    { name: "boot" }
  ];

  const productData = [
    {
      name: 'Assassin Sneakers',
      description: 'Very elaborate sneakers',
      price: 125,
      quantity: 7
    },
    {
      name: 'Nike M40K1 Size 12',
      description: 'Nike brand sneakers with shoe size 12',
      price: 80,
      quantity: 12
    },
    {
      name: 'Ballet Shoes',
      description: 'Made for ballerinas',
      price: 30,
      quantity: 30
    },
    {
      name: 'Suede loafers',
      description: 'Perfect for work',
      price: 75,
      quantity: 24
    },
    {
      name: 'Allbirds',
      description: 'Comfortable wool sneakers',
      price: 95,
      quantity: 17
    },
    {
      name: 'Stuart Weitzman stilettos',
      description: 'Very tall heels!',
      price: 250,
      quantity: 9
    },
    {
      name: 'Nike Zoom',
      description: 'Great for running',
      price: 70,
      quantity: 34
    },
    {
      name: 'Salvatore Ferragamo leather dress shoes',
      description: 'Go perfectly with a tux',
      price: 400,
      quantity: 11
    },
    {
      name: 'Adidas Stan Smith',
      description: 'Trendy tennis shoes',
      price: 110,
      quantity: 37
    },
    {
      name: 'Manolo Blahnik strappy sandals',
      description: 'Summery and stylish',
      price: 600,
      quantity: 6
    },
    {
      name: 'Cole Haan oxfords',
      description: 'Dress them up or down!',
      price: 170,
      quantity: 21
    },
    {
      name: 'Louis Vuitton flats',
      description: 'black leather ballet flats',
      price: 260,
      quantity: 15
    },
    {
      name: 'Adidas superstar',
      description: 'White sneakers with black stripe',
      price: 95,
      quantity: 58
    },
    {
      name: 'Frye boots',
      description: 'Brown leather knee-high boots',
      price: 220,
      quantity: 29
    },
    {
      name: 'Snow boots',
      description: 'Perfect for Chicago winters',
      price: 100,
      quantity: 22
    },
    {
      name: 'Vans slip-on sneakers',
      description: 'Easy and comfortable',
      price: 65,
      quantity: 44
    },
    {
      name: 'Converse Chuck Taylor high-tops',
      description: 'Black and white sneakers',
      price: 80,
      quantity: 61
    },
    {
      name: 'Christian Louboutin pumps',
      description: 'Tan leather heels',
      price: 420,
      quantity: 18
    },
    {
      name: 'Cowboy boots',
      description: 'Brown leather boots',
      price: 90,
      quantity: 4
    },
    {
      name: 'Keds sneakers',
      description: 'Casual red sneakers',
      price: 55,
      quantity: 23
    },
    {
      name: 'Timberland boots',
      description: 'Great for hiking',
      price: 180,
      quantity: 8
    }
  ];

  const categories = await Category.bulkCreate(categoryData, {returning: true});

  const products = await Product.bulkCreate(productData, {returning: true});

  const [sneaker, men, women, dress, boot] = categories
  const [assassins, nikes, ballets, loafers, allbirds,
        heels, nikeZoom, dressShoes, stanSmith, manolos,
        oxfords, flats, adidas, fryes, snowBoots,
        vans, converse, pumps, cowboy, keds, timberlands] = products;

  await Promise.all([
    assassins.setCategories([sneaker, men]),
    nikes.setCategories([sneaker]),
    ballets.setCategories([women]),
    loafers.setCategories([men, dress]),
    allbirds.setCategories([women, sneaker]),
    heels.setCategories([women, dress]),
    nikeZoom.setCategories([sneaker]),
    dressShoes.setCategories([men, dress]),
    stanSmith.setCategories([sneaker]),
    manolos.setCategories([women, dress]),
    oxfords.setCategories([men, dress]),
    flats.setCategories([women, dress]),
    adidas.setCategories([women, sneaker]),
    fryes.setCategories([boot, women]),
    snowBoots.setCategories([boot]),
    vans.setCategories([sneaker]),
    converse.setCategories([sneaker]),
    pumps.setCategories([women, dress]),
    cowboy.setCategories([boot]),
    keds.setCategories([women, sneaker]),
    timberlands.setCategories([men, boot])
  ]);

  const orders = await Promise.all([
    Order.create({
      price: [125.0, 30],
      productId: [0, 2],
      quantity: [1, 2],
      timeOrdered: new Date(2018, 6, 11, 13, 54, 13, 9),
      shippingAddress: '999 Mohegan Ave, New London CT',
      email: 'cody@email.com',
      userId: 1
    }),
    Order.create({
      price: [80],
      productId: [1],
      quantity: [1],
      timeOrdered: new Date(2018, 6, 14, 12, 10, 55, 31),
      shippingAddress: '999 Mohegan Ave, New London',
      email: 'cody@email.com',
      userId: 1
    }),
    Order.create({
      price: [30],
      productId: [2],
      quantity: [1],
      timeOrdered: new Date(2018, 4, 12, 22, 1, 13, 34),
      shippingAddress: '34 River Drive, Evergreen',
      email: 'murphy@gmail.com',
      userId: 2
    })
  ])

  const reviews = await Promise.all([
    Review.create(
      {
        title: 'Worth Spoiling Yourself For',
        rating: 5,
        content:
          'These shoes are very good. Comfortable, durable, very good design. Of course you want to keep them in a safe spot when not using them if you have a disobedient dog, as they do not come cheap!',
        productId: 1,
        userId: 1
      },
      Review.create({
        title: 'Substandard',
        rating: 2,
        content:
          "I must ask what exactly are the materials used to make these shoes. They are fairly comfortable, but they degrade very easily; they didn't last for more than 3 months. I would give them a much better rating if they weren't so cheaply made.",
        productId: 3,
        userId: 1
      })
    ),
    Review.create({
      title: 'Very Charming',
      rating: 4,
      content:
        'In terms of looks, these ballet shoes are very good looking. They are also comfortable too. My niece was delighted to receive them. However, some caution does need to be taken, or else they can wear out easily.',
      productId: 3,
      userId: 2
    })
  ])

  console.log(`seeded successfully`)
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
