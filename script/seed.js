'use strict'

const db = require('../server/db')
const {User, Category, Product, Order, OrderItem, ShippingInfo, Review} = require('../server/db/models')

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
    }),
    User.create({
      email: 'hgmadds@gmail.com',
      password: 'fakeys47',
      isAdmin: false
    }),
    User.create({
      email: 'apetrensky@yahoo.com',
      password: 'godswol69@',
      isAdmin: false
    })
  ])

  const categoryData = [
    {name: 'sneaker'},
    {name: "men's"},
    {name: "women's"},
    {name: 'dress'},
    {name: 'boot'}
  ]

  const productData = [
    {
      name: 'Assassin Sneakers Size 10',
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
      quantity: 0
    }
  ]

  const shippingAddressData = [
    {
      firstName: 'Heather',
      lastName: 'Madison',
      streetAddress: '3849 Ainsley Street',
      city: 'Chicago',
      region: 'IL',
      postalCode: 60224,
      country: 'United States',
      phoneNumber: '8697859912',
      email: 'hgmadds@gmail.com'
    },
    {
      firstName: 'Aleksander',
      lastName: 'Triebjvec',
      streetAddress: '587 Cloud Avenue',
      city: 'Sarajevo',
      region: 'Sarajevo',
      postalCode: 71000,
      country: 'Bosnia and Herzegovina',
      phoneNumber: '0119928216',
      email: 'apetrensky@yahoo.com'
    },
    {
      firstName: 'Aleksander',
      lastName: 'Triebjvec',
      streetAddress: '8754 Rosewood St.',
      city: 'Bronx',
      region: 'NY',
      postalCode: 10468,
      country: 'United States',
      phoneNumber: '9174158901',
      email: 'apetrensky@yahoo.com'
    },
    {
      firstName: 'Cody',
      lastName: 'Marphy',
      streetAddress: '666 Sunset Blvd',
      city: 'Chicago',
      region: 'IL',
      postalCode: 60619,
      country: 'United States',
      phoneNumber: '8478860784',
      email: 'cody@email.com'
    },
    {
      firstName: 'Andrew',
      lastName: 'Walbert',
      streetAddress: '980 Mohegan Avenue',
      city: 'New London',
      region: 'CT',
      postalCode: 6320,
      country: 'United States',
      phoneNumber: '8607578659',
      email: 'ulyssesT@hotmail.com'
    }
  ];

  const shippingAddresses = await ShippingInfo.bulkCreate(shippingAddressData, {returning: true});

  const categories = await Category.bulkCreate(categoryData, {returning: true})

  const products = await Product.bulkCreate(productData, {returning: true})

  const [ cody, murphy, heather, aleskander ] = users;

  const [sneaker, men, women, dress, boot] = categories
  const [
    assassins,
    nikes,
    ballets,
    loafers,
    allbirds,
    heels,
    nikeZoom,
    dressShoes,
    stanSmith,
    manolos,
    oxfords,
    flats,
    adidas,
    fryes,
    snowBoots,
    vans,
    converse,
    pumps,
    cowboy,
    keds,
    timberlands
  ] = products
  const [ streetA, bosnianStreet, usaddress, adminaddress, guestAddress ] = shippingAddresses;

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
  ])

  await Promise.all([
    cody.setShippingInfos([adminaddress]),
    heather.setShippingInfos([streetA]),
    aleskander.setShippingInfos([bosnianStreet, usaddress])
  ]);

  const orderData = [
    { price: 250, quantity: 1, timeOrdered: Date.now(), status: 'Compelted', shippingInfoId: 1, userId: 3 },
    { price: 520, quantity: 3, timeOrdered: Date.now(), status: 'Completed', shippingInfoId: 5 },
    { price: 30, quantity: 1, timeOrdered: Date.now(), status: 'Processing', shippingInfoId: 1, userId: 3 },
    { price: 185, quantity: 2, timeOrdered: Date.now(), status: 'Created', shippingInfoId: 3, userId: 4 },
    { price: 235, quantity: 2, timeOrdered: Date.now(), status: 'Completed', shippingInfoId: 2, userId: 4 },
    { price: 60, quantity: 2, timeOrdered: Date.now(), status: 'Canceled', shippingInfoId: 4, userId: 1 }
  ];

  const orderItemsData = [
    { price: 250, quantity: 1, productId: 6 },
    { price: 440, quantity: 2, productId: 14 },
    { price: 80, quantity: 1, productId: 17 },
    { price: 30, quantity: 1, productId: 3 },
    { price: 75, quantity: 1, productId: 4 },
    { price: 110, quantity: 1, productId: 9 },
    { price: 180, quantity: 1, productId: 21 },
    { price: 55, quantity: 1, productId: 20 },
    { price: 60, quantity: 2, productId: 3 }
  ];

  const orderItems = await OrderItem.bulkCreate(orderItemsData, {returning: true});

  const orders = await Order.bulkCreate(orderData, {returning: true});

  await Promise.all([
    orders[0].setOrderItems([orderItems[0]]),
    orders[1].setOrderItems([orderItems[1], orderItems[2]]),
    orders[2].setOrderItems([orderItems[3]]),
    orders[3].setOrderItems([orderItems[4], orderItems[5]]),
    orders[4].setOrderItems([orderItems[6], orderItems[7]]),
    orders[5].setOrderItems([orderItems[8]])
  ]);

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
