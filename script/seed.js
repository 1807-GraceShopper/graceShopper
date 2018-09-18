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
      name: 'Assassin Sneakers',
      description:
        'These sneakers are a representation of the elaborate sneaker trend, pulled right out of fashion week!',
      price: 125,
      quantity: 7,
      photoUrl: 'Assassin Sneakers.jpg'
    },
    {
      name: 'Nike Flex Contact',
      description:
        'These Nike brand sneakers are the perfect companion to your nightly run.',
      price: 80,
      quantity: 12,
      photoUrl: 'Nike Flex Contact.jpg'
    },
    {
      name: 'Balera Ballet Shoes',
      description:
        "These shoes are perfect for a ballerina's daily use, whether it's her first recital or her hundredth competition",
      price: 30,
      quantity: 30,
      photoUrl: 'ballet shoes.jpeg'
    },
    {
      name: 'Gucci Velvet Loafer',
      description:
        'These bright loafers will make a statement, whether for your next big meeting or after-work cocktails!',
      price: 75,
      quantity: 24,
      photoUrl: 'Gucci Velvet Loafer.png'
    },
    {
      name: 'Allbirds Wool Runners',
      description:
        'These are the perfect everyday shoe, made for comfort and in a statement-making hue',
      price: 95,
      quantity: 17,
      photoUrl: 'Allbirds.png'
    },
    {
      name: 'Stuart Weitzman stilettos',
      description:
        'These sky-high stilettos will turn heads at your next function.',
      price: 250,
      quantity: 9,
      photoUrl: 'Stuart Weitzman stilettos.png'
    },
    {
      name: 'Nike Zoom',
      description: 'This classic fit is a must for your next run',
      price: 70,
      quantity: 34,
      photoUrl: 'Nike Zoom.png'
    },
    {
      name: 'Salvatore Ferragamo leather dress shoes',
      description:
        'These sleek black leather shoes would go perfectly with a tux',
      price: 400,
      quantity: 11,
      photoUrl: 'Salvatore Ferragamo leather dress shoes.png'
    },
    {
      name: 'Adidas Stan Smith',
      description: 'These on-trend sneakers are great for everyday wear',
      price: 110,
      quantity: 37,
      photoUrl: 'Adidas Stan Smith.png'
    },
    {
      name: 'Manolo Blahnik strappy sandals',
      description: 'These sandals are the perfect mix of summery and stylish',
      price: 600,
      quantity: 6,
      photoUrl: 'Manolo Blahnik strappy sandals.png'
    },
    {
      name: 'Cole Haan oxfords',
      description:
        "You'll find yourself reaching for these staple shoes every day - dress them up or down!",
      price: 170,
      quantity: 21,
      photoUrl: 'Cole Haan oxfords.png'
    },
    {
      name: 'Louis Vuitton flats',
      description: 'A classic take on the leather ballet flat.',
      price: 260,
      quantity: 15,
      photoUrl: 'Louis Vuitton flats.png'
    },
    {
      name: 'Adidas Superstar',
      description: 'Classic white sneakers with black stripe',
      price: 95,
      quantity: 58,
      photoUrl: 'Adidas Superstar.png'
    },
    {
      name: 'Frye leather boots',
      description: 'Gorgeous brown leather knee-high boots, perfect for fall.',
      price: 220,
      quantity: 29,
      photoUrl: 'Frye boots.png'
    },
    {
      name: 'Sorel snow boots',
      description: 'Perfect for Chicago winters',
      price: 100,
      quantity: 22,
      photoUrl: 'Sorel snow boots.png'
    },
    {
      name: 'Vans slip-on sneakers',
      description:
        'Easy and comfortable for everyday wear - a tried and true favorite',
      price: 65,
      quantity: 44,
      photoUrl: 'Vans slip-on sneakers.png'
    },
    {
      name: 'Converse Chuck Taylor High-Tops',
      description: "Everyone's favorite sneaker in a berry red shade",
      price: 80,
      quantity: 61,
      photoUrl: 'Converse Chuck Taylor High-Tops.png'
    },
    {
      name: 'Christian Louboutin pumps',
      description: 'Black leather heels for a night out',
      price: 420,
      quantity: 18,
      photoUrl: 'Christian Louboutin pumps.png'
    },
    {
      name: 'American Rag cowboy boots',
      description: 'Brown leather boots with a western take',
      price: 90,
      quantity: 4,
      photoUrl: 'American Rag cowboy boots.png'
    },
    {
      name: 'Keds sneakers',
      description: 'A classic white canvas look, perfect for summer',
      price: 55,
      quantity: 23,
      photoUrl: 'Keds sneakers.png'
    },
    {
      name: 'Timberland boots',
      description: 'The perfect work shoe for the rugged outdoorsman',
      price: 180,
      quantity: 1,
      photoUrl: 'Timberland boots.png'
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
